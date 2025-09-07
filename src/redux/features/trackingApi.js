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

    getUsers: builder.query({
      query: ({ page, limit, searchText }) => {
        return {
          url: `/admin/users?limit=${limit}&page=${page}&search=${searchText}`,
          method: "GET",
        };
      },
    }),

    getCoach: builder.query({
      query: ({ searchTerm, page }) => {
        return {
          url: `/user?role=COUCH&searchTerm=${searchTerm}&page=${page}`,
          method: "GET",
        };
      },
    }),

    addCoach: builder.mutation({
      query: (data) => {
        return {
          url: "/user?role=COUCH",
          method: "POST",
          body: data,
        };
      },
    }),

    updateCoach: builder.mutation({
      query: (data) => {
        return {
          url: "/user?role=COUCH",
          method: "PATCH",
          body: data,
        };
      },
    }),

    getAdmin: builder.query({
      query: ({ searchTerm }) => {
        return {
          url: `/user?role=ADMIN&searchTerm=${searchTerm}`,
          method: "GET",
        };
      },
    }),

    addAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/user/admin",
          method: "POST",
          body: data,
        };
      },
    }),

    lockUser: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/user/${id}`,
          method: "PATCH",
        };
      },
    }),
  }),
});
export const {
  useGetGarageHistoryQuery,
  useGetUsersQuery,
  useUpdateCoachMutation,
  useGetAdminQuery,
  useAddCoachMutation,
  useLockUserMutation,
  useGetCoachQuery,
  useAddAdminMutation,
} = trackingApi;
