import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constant";

export const allApi = createApi({
  reducerPath: "allApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProfile: builder.mutation({
      query: () => `/auth`,
    }),

    createQuestion: builder.mutation({
      query: (data) => ({
        url: "/question",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetProfileMutation, useCreateQuestionMutation } = allApi;
