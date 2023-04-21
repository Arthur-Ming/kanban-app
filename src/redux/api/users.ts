import { api, httpClient, userRoutes } from './api';
import { IUser } from 'interfaces';
import { getUserId } from 'utils/cookies';
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
              name: user.name,
              email: user.email,
            })
          );
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useUserByIdQuery, useLazyUserByIdQuery } = usersApi;
