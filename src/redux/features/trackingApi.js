import { baseApi } from "../api/baseApi";

const trackingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGarageHistory: builder.query({
      query: ({ page, limit, searchText }) => {
        return {
          url: `/admin/get-bookings?limit=${limit}&page=${page}&search=${searchText}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const {
  useGetGarageHistoryQuery,
} = trackingApi;
