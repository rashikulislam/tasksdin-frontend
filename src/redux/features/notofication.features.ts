import { baseApi } from "../baseApi";

const notificationApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    readNotification: builder.mutation({
      query: (payload: { id: string }) => ({
        url: `/notification/read/${payload?.id}`,
        method: "PATCH",
      }),
    }),
    getNotification: builder.query({
      query: () => ({
        url: `/notification/all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationQuery, useReadNotificationMutation } =
  notificationApi;
