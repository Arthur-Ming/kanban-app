import { api, apiParams, apiRoutes } from './api';
import Cookies from 'js-cookie';
import { IUser } from 'interfaces';

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
    userById: builder.query<IUser, string | null>({
      query: (userId) => {
        console.log(userId);

        if (!userId) return apiRoutes.userById('');
        console.log(apiRoutes.userById(userId));
        return apiRoutes.userById(userId);
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginUser: builder.mutation({
      query: (userRegisterBody) => {
        console.log(userRegisterBody);

        return apiParams.post(apiRoutes.userLogin(), userRegisterBody);
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
          console.log(error);
        }
      },
    }),
    registerUser: builder.mutation({
      query: (userRegisterBody) => apiParams.post(apiRoutes.userRegister(), userRegisterBody),
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
