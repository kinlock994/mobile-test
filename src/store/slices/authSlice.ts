import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { getTokens, saveTokens, removeTokens } from '@services/storage';
import { authApi } from '@store/api/authApi';

export interface UserProfile {
  displayName: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  bootstrapped: boolean;
  user?: UserProfile;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  bootstrapped: false,
  user: undefined,
};

export const bootstrapAuth = createAsyncThunk(
  'auth/bootstrap',
  async () => await getTokens(),
);

import type { AppDispatch, RootState } from '@store/index';
export const fetchProfileIfNeeded =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { isAuthenticated, user } = getState().auth;
    const cached = authApi.endpoints.getProfile.select()(getState());
    if (isAuthenticated && !user && !cached?.isLoading) {
      dispatch(authApi.endpoints.getProfile.initiate());
    }
  };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, { payload }) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.isAuthenticated = true;
    },
    signOut(state) {
      removeTokens();
      Object.assign(state, initialState, { bootstrapped: true });
    },
  },
  extraReducers: builder => {
    // bootstrap result
    builder
      .addCase(bootstrapAuth.fulfilled, (state, { payload }) => {
        if (payload) {
          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken;
          state.isAuthenticated = true;
        }
        state.bootstrapped = true;
      })
      .addCase(bootstrapAuth.rejected, state => {
        state.bootstrapped = true;
      });

    // pick fulfilled actions from login OR register
    builder.addMatcher(
      isAnyOf(
        authApi.endpoints.login.matchFulfilled,
        authApi.endpoints.register.matchFulfilled,
      ),
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.isAuthenticated = true;
        saveTokens(payload);
      },
    );
    builder.addMatcher(
      authApi.endpoints.getProfile.matchFulfilled,
      (s, { payload }) => {
        s.user = {
          displayName: payload.displayName ?? '',
          email: payload.email,
          avatar: (payload as any).avatar,
          role: (payload as any).role,
        };
      },
    );
  },
});

export const { setTokens, signOut } = slice.actions;
export const authReducer = slice.reducer;
