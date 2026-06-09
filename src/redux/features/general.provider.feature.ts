import { baseApi } from "../baseApi";

const generalProviderApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    generalProviderVerifiedStatus: builder.query({
      query: () => ({
        url: `/general-provider/status`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGeneralProviderVerifiedStatusQuery } = generalProviderApi;
