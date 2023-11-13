import { apiSlice } from '../api/apiSlice';

type RegistrationData = {};

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersAnalytics: builder.query({
      query: () => ({
        url: 'get-users-analytics',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    getCourseAnalytics: builder.query({
      query: () => ({
        url: 'get-courses-analytics',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    getOrderAnalytics: builder.query({
      query: () => ({
        url: 'get-orders-analytics',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const { useGetUsersAnalyticsQuery ,useGetCourseAnalyticsQuery, useGetOrderAnalyticsQuery } = analyticsApi;
