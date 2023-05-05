import { api, authRoutes, httpClient } from './api';
import Cookies from 'js-cookie';
import { IUser, IUserLoginBody } from 'interfaces';

class AppError extends Error {
  status: number | undefined;
  constructor(message: string) {
    super(message);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}

const tokenExpire = 0.5;

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => {
        const { getUrl, isProtected } = authRoutes.user;
        return httpClient.get({ url: getUrl(), isProtected });
      },
    }),
    login: builder.mutation<IUser, IUserLoginBody>({
      query: (body) => {
        const { getUrl, isProtected } = authRoutes.login;
        return httpClient.post({ url: getUrl(), body, isProtected });
      },
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data: user } = await queryFulfilled;
          const { token, name, id, email } = user;
          Cookies.set('token', token, {
            expires: tokenExpire,
          });
          Cookies.set('userId', id, {
            expires: tokenExpire,
          });
        } catch (error) {}
      },
    }),
    register: builder.mutation({
      query: (body) => {
        const { getUrl, isProtected } = authRoutes.register;
        return httpClient.post({ url: getUrl(), body, isProtected });
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } = authApi;
