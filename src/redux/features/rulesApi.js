import { baseApi } from "../api/baseApi";

const rulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/rule/about`,
        };
      },
    }),

    updateAbout: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/rule/about",
          body: data,
        };
      },
    }),

    getTerms: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/rule/terms-and-conditions`,
        };
      },
    }),

    updateTerms: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/rule/terms-and-conditions",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetAboutQuery, useUpdateAboutMutation, useGetTermsQuery, useUpdateTermsMutation } = rulesApi;
