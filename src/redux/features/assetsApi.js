import { baseApi } from "../api/baseApi";

const assetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehicle: builder.query({
      query: ({ page, limit, searchText }) => {
        return {
          url: `/service?limit=${limit}&page=${page}&search=${searchText}`,
          method: "GET",
        };
      },
    }),

    getDevices: builder.query({
      query: ({ searchText, page }) => {
        return {
          url: `/service/withDevice?search=${searchText}&page=${page}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const { useGetVehicleQuery, useGetDevicesQuery } = assetsApi;
