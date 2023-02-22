import { api, apiParams, apiRoutes } from './api';

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userRegisterBody) => apiParams.post(apiRoutes.userLogin(), userRegisterBody),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        console.log(data);
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

export const { useLoginUserMutation, useRegisterUserMutation } = usersApi;
