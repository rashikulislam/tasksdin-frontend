import { baseApi } from "../baseApi";

const verificationApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    applyVerification: builder.mutation({
      query: (payload) => ({
        url: "/verification/apply",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useApplyVerificationMutation } = verificationApi;
