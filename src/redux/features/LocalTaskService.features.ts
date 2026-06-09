import { Service } from "@/interfaces";
import { baseApi } from "../baseApi";

interface LocalTaskCategoryResponse {
  success: boolean;
  data: Service[];
  message?: string;
}

const LocalTaskServiceApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getLocalTaskCategory: builder.query<LocalTaskCategoryResponse, void>({
      query: () => ({
        url: `/service-category-non-skilled/get-all-non-skill-active-category`,
        method: "GET",
      }),
    }),

    //  GET NON Skill Task

    getSingleNonSkillTaskCategory: builder.query({
      query: (slug: string) => ({
        url: `/service-category-non-skilled/get-single-category/${slug}`,
        method: "GET",
      }),
    }),
    //  GET NON Skill Task
  }),
});

export const {
  useGetLocalTaskCategoryQuery,
  useGetSingleNonSkillTaskCategoryQuery,
} = LocalTaskServiceApi;
