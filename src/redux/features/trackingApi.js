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

    updateDistance: builder.mutation({
      query: (payload) => {
        return {
          url: `/service/miles/${payload?.id}`,
          method: "PATCH",
          body: payload?.body,
        };
      },
    }),
  }),
});
export const { useGetGarageHistoryQuery, useUpdateDistanceMutation } =
  trackingApi;
