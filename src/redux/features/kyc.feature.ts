import { baseApi } from "../baseApi";

const kycApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    submitKyc: builder.mutation({
      query: (formData: FormData) => ({
        url: "/kyc/submit",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["KYC"],
    }),

    getKycStatus: builder.query({
      query: () => ({
        url: "/kyc/status",
        method: "GET",
      }),
      providesTags: ["KYC"],
    }),

    // ── Didit (third-party KYC provider) ──────────────────────────────────

    // Starts a hosted Didit verification session; returns { session_url, ... }
    // — redirect the user to session_url to complete verification.
    // `redirect_url` is the page Didit sends the browser back to after verification.
    // Passing the current origin here makes local dev and production both work correctly.
    createDiditKycSession: builder.mutation({
      query: (body?: { redirect_url?: string }) => ({
        url: "/kyc/didit/session",
        method: "POST",
        body: body ?? {},
      }),
      invalidatesTags: ["KYC"],
    }),

    getDiditKycStatus: builder.query({
      query: () => ({
        url: "/kyc/didit/status",
        method: "GET",
      }),
      providesTags: ["KYC"],
    }),
  }),
});

export const {
  useSubmitKycMutation,
  useGetKycStatusQuery,
  useCreateDiditKycSessionMutation,
  useGetDiditKycStatusQuery,
} = kycApi;
