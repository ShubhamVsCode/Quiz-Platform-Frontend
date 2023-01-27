import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constant";

export const allApi = createApi({
  reducerPath: "allApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      // console.log("State", getState());

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.mutation({
      query: () => `/auth`,
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        body: data,
        method: "POST",
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        body: data,
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),

    getUpcomingQuizzes: builder.query({
      query: () => ({
        url: "/quiz/upcoming",
      }),
    }),

    createQuestion: builder.mutation({
      query: (data) => ({
        url: "/question",
        body: data,
        method: "POST",
      }),
    }),
    updateQuestion: builder.mutation({
      query: (data) => ({
        url: `/question/${data?._id}`,
        body: data,
        method: "PUT",
      }),
    }),

    updateOption: builder.mutation({
      query: (data) => ({
        url: `/option/${data?._id}`,
        body: data,
        method: "PUT",
      }),
    }),

    createQuiz: builder.mutation({
      query: (data) => ({
        url: "/quiz",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetProfileMutation,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,

  useGetUpcomingQuizzesQuery,

  useCreateQuestionMutation,
  useUpdateQuestionMutation,

  useUpdateOptionMutation,
  useCreateQuizMutation,
} = allApi;
