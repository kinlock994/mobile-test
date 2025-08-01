import { fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { API_BASE_URL } from '@env';
import { RootState } from '@store/index';
import { saveTokens, removeTokens } from '@services/storage';
import { setTokens, signOut } from '@store/slices/authSlice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQuery: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (!refreshToken) {
      api.dispatch(signOut());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: '/refresh-token',
        method: 'POST',
        body: { refreshToken },
        headers: { Authorization: undefined },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const { accessToken, refreshToken: newRt } = refreshResult.data as {
        accessToken: string;
        refreshToken: string;
      };

      api.dispatch(setTokens({ accessToken, refreshToken: newRt }));
      await saveTokens({ accessToken, refreshToken: newRt });

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(signOut());
      await removeTokens();
    }
  }
  return result;
};
