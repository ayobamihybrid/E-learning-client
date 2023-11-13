import { apiSlice } from '../api/apiSlice';
import { userLoggedIn, userLoggedOut, userRegistration } from './authSlice';

type ResponseData = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ResponseData, RegistrationData>({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    activation: builder.mutation({
      query: ({ activation_code, activation_token }) => ({
        url: 'activation',
        method: 'POST',
        body: { activation_code, activation_token },
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    logout: builder.query({
      query: () => ({
        url: 'logout',
        method: 'GET',
        credentials: 'include' as const
      }),

      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: 'social-auth',
        method: 'POST',
        body: { email, name, avatar },
        credentials: 'include' as const,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutQuery,
} = authApi;
