import { baseApi } from "../baseApi";

const messageApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // CREATE CONSUMER ACCOUNT
    uploadFile: builder.mutation({
      query: (payload) => ({
        url: "/message/file-upload",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = messageApi;
