import { baseApi } from "../baseApi";

const contractNonSkillApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET CONSUMER COMPLETE TASKS
    getConsumerCompleteTasks: builder.query({
      query: () => ({
        url: `/contract/consumer-complete-tasks`,
        method: "GET",
      }),
    }),

    // GET PROVIDER COMPLETE TASKS
    getProviderCompleteTasks: builder.query({
      query: () => ({
        url: `/contract/provider-complete-tasks`,
        method: "GET",
      }),
    }),

    // SEND COMPLETE TASK CONFIRMATION {PROVIDER}
    sendCompleteTaskConfirmation: builder.mutation({
      query: (id) => ({
        url: `/contract/task-complete-request/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["CONTRACT_END"],
    }),

    // ACCEPT COMPLETE TASK CONFIRMATION BY CONSUMER
    acceptCompleteTaskConfirmation: builder.mutation({
      query: (id) => ({
        url: `/contract/task-complete-request-accept/${id}`,
        method: "PATCH",
      }),
      // invalidatesTags: [""],
    }),
    // CANCEL TASK
    cancelContract: builder.mutation({
      query: (payload) => ({
        url: `/contract/cancel-contract/${payload?.id}`,
        method: "PATCH",
        body: payload?.data,
      }),
      // invalidatesTags: [""],
    }),
  }),
});

export const {
  useSendCompleteTaskConfirmationMutation,
  useAcceptCompleteTaskConfirmationMutation,
  useGetConsumerCompleteTasksQuery,
  useGetProviderCompleteTasksQuery,
  useCancelContractMutation,
} = contractNonSkillApi;
