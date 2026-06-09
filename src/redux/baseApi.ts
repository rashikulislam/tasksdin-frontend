import { getToken } from "@/service/auth.services";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API as string,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [
    "LOCAL_TASK",
    "LOCATION",
    "CONTRACT_END",
    "LOCAL_TASK_APPLY_REFRESH",
    "HOME_MAID_AGENT",
    "MAID_ORDER",
    "MAID_DETAILS_AGENT",
    "KYC",
  ],
  endpoints: () => ({}),
});
