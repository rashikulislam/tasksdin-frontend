import { baseApi } from "../baseApi";

const proposalNonSkill = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    //  CREATE PROPOSAL
    createProposalNonSkill: builder.mutation({
      query: (payload) => ({
        url: "/proposal-non-skill/create-proposal",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["LOCAL_TASK_APPLY_REFRESH"],
    }),

    // ACCEPT PROPOSAL
    acceptProposalNonSkill: builder.mutation({
      query: (payload) => ({
        url: "/proposal-non-skill/accept-proposal",
        method: "POST",
        body: payload,
      }),
    }),

    getParticularTaskProposal: builder.query({
      query: (id: string) => ({
        url: `/proposal-non-skill/task-proposal/${id}`,
        method: "GET",
      }),
    }),

    getProviderProposals: builder.query({
      query: () => ({
        url: `/proposal-non-skill/provider-proposals`,
        method: "GET",
      }),
    }),

    getProviderRunningProposals: builder.query({
      query: () => ({
        url: `/proposal-non-skill/provider-running-proposals`,
        method: "GET",
      }),
    }),

    getConsumerContracts: builder.query({
      query: () => ({
        url: `/proposal-non-skill/consumer-contracts`,
        method: "GET",
      }),
    }),

    getConsumerSingleContract: builder.query({
      query: (payload: string) => ({
        url: `/proposal-non-skill/single-contract-consumer/${payload}`,
        method: "GET",
      }),
      providesTags: ["CONTRACT_END"],
    }),

    getProviderSingleContract: builder.query({
      query: (payload: string) => ({
        url: `/proposal-non-skill/single-contract-provider/${payload}`,
        method: "GET",
      }),
      providesTags: ["CONTRACT_END"],
    }),

    // TODO
    getFullConversation: builder.query({
      query: (conversationId: string) => ({
        url: `/conversation/get-conversation/${conversationId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProposalNonSkillMutation,
  useGetProviderProposalsQuery,
  useGetParticularTaskProposalQuery,
  useAcceptProposalNonSkillMutation,
  useGetProviderRunningProposalsQuery,
  useGetConsumerContractsQuery,
  useGetConsumerSingleContractQuery,
  useGetProviderSingleContractQuery,
} = proposalNonSkill;
