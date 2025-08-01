import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@env';
import { store } from '@store/index';
import { setTokens, signOut } from '@store/slices/authSlice';
import { saveTokens, removeTokens } from '@services/storage';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
});

/* ---------- Attach access token on every request ---------- */
api.interceptors.request.use(config => {
  const token = store.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ---------- Handle 401 → try once to refresh -------------- */
api.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const original = error.config as any;
    console.log(store.getState().auth);
    
    if (
      error.response?.status === 401 &&
      !original?._retry &&
      store.getState().auth.refreshToken
    ) {
      console.log("retry");
      
      original._retry = true;
      try {
        const { data } = await axios.post<{
          accessToken: string;
          refreshToken: string;
        }>(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken: store.getState().auth.refreshToken },
          { headers: { Authorization: undefined } }, // avoid old AT
        );

        /* Persist & propagate */
        store.dispatch(setTokens(data));
        await saveTokens(data);

        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        /* Hard logout */
        store.dispatch(signOut());
        await removeTokens();
      }
    }
    return Promise.reject(error);
  },
);

export default api;
