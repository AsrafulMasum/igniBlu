import { baseApi } from "../api/baseApi";

const supportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupportMessages: builder.query({
      query: ({ page, limit, searchText }) => {
        return {
          url: `/support?limit=${limit}&page=${page}&search=${searchText}`,
          method: "GET",
        };
      },
    }),

    replySupportMessages: builder.mutation({
      query: (payload) => {
        return {
          url: `/support/reply/${payload?.id}`,
          method: "POST",
          body: payload?.replyMessage,
        };
      },
    }),
  }),
});
export const { useGetSupportMessagesQuery, useReplySupportMessagesMutation } =
  supportsApi;
