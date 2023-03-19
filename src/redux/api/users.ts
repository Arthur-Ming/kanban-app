import { api, httpClient, userRoutes } from './api';
import Cookies from 'js-cookie';
import { IUser, IUserLoginBody } from 'interfaces';
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
    userById: builder.query<IUser, string>({
      query: (userId) => {
        const { getUrl, isProtected } = userRoutes.userById;

        /*  const userId = getUserId(); */
        return httpClient.get({ url: getUrl(userId), isProtected });
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(
            login({
              name: user.name,
              email: user.email,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginUser: builder.mutation<IUser, IUserLoginBody>({
      query: (body) => {
        const { getUrl, isProtected } = userRoutes.login;
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
          dispatch(
            login({
              name: name,
              email: email,
            })
          );
        } catch (error) {}
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
