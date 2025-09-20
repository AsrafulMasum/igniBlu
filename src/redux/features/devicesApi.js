import { baseApi } from "../api/baseApi";

const devicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetDevicesQuery } = devicesApi;
