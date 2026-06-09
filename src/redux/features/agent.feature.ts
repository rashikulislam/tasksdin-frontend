import { baseApi } from "../baseApi";

const agentApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // CREATE CONSUMER ACCOUNT
    createHomeMaid: builder.mutation({
      query: (payload) => ({
        url: "/agent/register/home-maid",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["HOME_MAID_AGENT"],
    }),

    getAgentHomeMaid: builder.query({
      query: () => ({
        url: `/agent/home-maid`,
        method: "GET",
      }),
      providesTags: ["HOME_MAID_AGENT"],
    }),
  }),
});

export const { useCreateHomeMaidMutation, useGetAgentHomeMaidQuery } = agentApi;
