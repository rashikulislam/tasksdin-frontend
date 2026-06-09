import { baseApi } from "../baseApi";

export const localTaskApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // POST Create Local Task
    createLocalTask: builder.mutation({
      query: (body) => ({
        url: "/non-skilled-task/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LOCAL_TASK"],
    }),

    getIncompleteTasks: builder.query({
      query: () => ({
        url: `/non-skilled-task/incomplete-tasks`,
        method: "GET",
      }),
      providesTags: ["LOCAL_TASK_APPLY_REFRESH"],
    }),

    getSingleTask: builder.query({
      query: (id: string) => ({
        url: `/non-skilled-task/single-task/${id}`,
        method: "GET",
      }),
    }),

    // GET PARTICULAR CONSUMER INCOMPLETE TASKS
    getParticularConsumerPostedTask: builder.query({
      query: () => ({
        url: `/non-skilled-task/consumer-posted-task`,
        method: "GET",
      }),
      providesTags: ["LOCAL_TASK"],
    }),

    // GET Non Skilled Task Create
    getPostTaskCategory: builder.query({
      query: () => ({
        url: `/service-category-non-skilled/get-category-name-id`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateLocalTaskMutation,
  useGetPostTaskCategoryQuery,
  useGetIncompleteTasksQuery,
  useGetSingleTaskQuery,
  useGetParticularConsumerPostedTaskQuery,
} = localTaskApi;
