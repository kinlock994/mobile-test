import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export interface Credentials {
  email: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  displayName: string;
  email: string;
  avatar?: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    login: builder.mutation<Tokens, Credentials>({
      query: creds => ({ url: '/auth/login', method: 'POST', body: creds }),
    }),
    register: builder.mutation<Tokens, Credentials>({
      query: creds => ({ url: '/auth/register', method: 'POST', body: creds }),
    }),
    getProfile: builder.query<User, void>({
      query: () => ({ url: '/auth/profile' }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } =
  authApi;
