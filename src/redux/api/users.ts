import { api, httpClient, userRoutes } from './api';
import Cookies from 'js-cookie';
import { IUser } from 'interfaces';
import { getToken, getUserId } from 'utils/cookies';
import { login } from 'redux/reducer/session';

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

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userById: builder.query<IUser, null>({
      query: () => {
        const { getUrl, isProtected } = userRoutes.userById;
        const userId = getUserId();
        return httpClient.get({ url: getUrl(userId), isProtected });
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(
            login({
              userName: user.name,
              email: user.email,
            })
          );
        } catch (error) {}
      },
    }),
    loginUser: builder.mutation({
      query: (body) => {
        const { getUrl, isProtected } = userRoutes.login;
        return httpClient.post({ url: getUrl(), body, isProtected });
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const { token, name, id } = data;
          Cookies.set('token', token, {
            expires: tokenExpire,
          });
          Cookies.set('userId', id, {
            expires: tokenExpire,
          });
        } catch (error) {
          console.log('!!!');
          console.error(error);
        }
      },
    }),
    registerUser: builder.mutation({
      query: (body) => {
        const { getUrl, isProtected } = userRoutes.registration;
        return httpClient.post({ url: getUrl(), body, isProtected });
      },
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        console.log(data);
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useUserByIdQuery,
  useLazyUserByIdQuery,
} = usersApi;
