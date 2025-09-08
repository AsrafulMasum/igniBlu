import { baseApi } from "../api/baseApi";

const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    statistics: builder.query({
      query: () => {
        return {
          url: `/booking/total-service`,
          method: "GET",
        };
      },
    }),

    userStatistics: builder.query({
      query: (userYear) => {
        return {
          url: `/booking/userstate?year=${userYear}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useStatisticsQuery, useUserStatisticsQuery } = statisticsApi;
