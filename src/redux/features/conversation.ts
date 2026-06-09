import { baseApi } from "../baseApi";

const conversationApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: `/conversation/get-conversations`,
        method: "GET",
      }),
    }),

    getFullConversation: builder.query({
      query: (conversationId: string) => ({
        url: `/conversation/get-conversation/${conversationId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetConversationsQuery, useGetFullConversationQuery } =
  conversationApi;
