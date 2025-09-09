import { baseApi } from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDrivers: builder.query({
      query: ({ page, limit, searchText }) => {
        return {
          url: `/admin/all-users-driver?limit=${limit}&page=${page}&search=${searchText}`,
          method: "GET",
        };
      },
    }),

    getUsers: builder.query({
      query: ({ page, limit, searchText }) => {
        return {
          url: `/admin/users?limit=${limit}&page=${page}&search=${searchText}`,
          method: "GET",
        };
      },
    }),

    lockUser: builder.mutation({
      query: (payload) => {
        return {
          url: `/user/update-status`,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});
export const {
  useGetDriversQuery,
  useGetUsersQuery,
  useLockUserMutation,
} = usersApi;
