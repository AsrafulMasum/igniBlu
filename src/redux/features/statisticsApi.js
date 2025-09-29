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

    distanceStatistics: builder.query({
      query: () => {
        return {
          url: `/service/miles`,
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

    deviceStatistics: builder.query({
      query: (deviceYear) => {
        return {
          url: `/service/yearly-device-stats?year=${deviceYear}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useStatisticsQuery,
  useDistanceStatisticsQuery,
  useUserStatisticsQuery,
  useDeviceStatisticsQuery,
} = statisticsApi;
