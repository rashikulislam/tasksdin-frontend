import { baseApi } from "../baseApi";

const homeMaidApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // CREATE CONSUMER ACCOUNT
    applyForHomeMaid: builder.mutation({
      query: (payload) => ({
        url: "/home-maid/apply",
        method: "POST",
        body: payload,
      }),
    }),

    // COMPLAIN ABOUT MAID
    complainAboutMaid: builder.mutation({
      query: (payload) => ({
        url: "/home-maid/complain",
        method: "POST",
        body: payload,
      }),
    }),

    getConsumerMaidApplication: builder.query({
      query: () => ({
        url: `/home-maid/applications`,
        method: "GET",
      }),
    }),

    getAgentMaidApplication: builder.query({
      query: () => ({
        url: `/home-maid/consumer-applications`,
        method: "GET",
      }),
      providesTags: ["MAID_ORDER"],
    }),

    getNonHireMaidApplication: builder.query({
      query: (id: string) => ({
        url: `/home-maid/non-hire/${id}`,
        method: "GET",
      }),
    }),

    // ASSIGN MAID
    assignHomeMaid: builder.mutation({
      query: (payload) => ({
        url: "/home-maid/assign-maid",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["MAID_ORDER"],
    }),

    // GET HIRED HOME MAID
    getAgentHiredMaid: builder.query({
      query: () => ({
        url: `/home-maid/hired`,
        method: "GET",
      }),
    }),
    getConsumerOrderedMaid: builder.query({
      query: () => ({
        url: `/home-maid/consumer-orders`,
        method: "GET",
      }),
    }),
    // GET HIRED HOME MAID
    getSingleHiredHomeMaidDetails: builder.query({
      query: (id: string) => ({
        url: `/home-maid/details/${id}`,
        method: "GET",
      }),
      providesTags: ["MAID_DETAILS_AGENT"],
    }),

    // GET SINGLE ORDER DETAILS FOR CONSUMER
    getSingleHiredHomeMaidDetailsForConsumer: builder.query({
      query: (id: string) => ({
        url: `/home-maid/consumer-details/${id}`,
        method: "GET",
      }),
    }),

    // ABSENCE MAINTAIN HERE
    createAbsenceMaid: builder.mutation({
      query: (payload) => ({
        url: "/maid-absence/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["MAID_DETAILS_AGENT"],
    }),
  }),
});

export const {
  useApplyForHomeMaidMutation,
  useGetConsumerMaidApplicationQuery,
  useGetAgentMaidApplicationQuery,
  useGetNonHireMaidApplicationQuery,
  useAssignHomeMaidMutation,
  useGetAgentHiredMaidQuery,
  useGetSingleHiredHomeMaidDetailsQuery,
  useGetSingleHiredHomeMaidDetailsForConsumerQuery,
  useGetConsumerOrderedMaidQuery,

  // ABSENCE MAINTAIN HERE
  useCreateAbsenceMaidMutation,

  // COMPLAIN
  useComplainAboutMaidMutation,
} = homeMaidApi;
