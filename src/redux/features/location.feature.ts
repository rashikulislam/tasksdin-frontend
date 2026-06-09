import { baseApi } from "../baseApi";

const locationApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createNewLocation: builder.mutation({
      query: (payload) => ({
        url: "/location/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["LOCATION"],
    }),

    changeLocation: builder.mutation({
      query: (id) => ({
        url: `/location/change/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["LOCATION"],
    }),

    findLocation: builder.query({
      query: () => ({
        url: `/location/find`,
        method: "GET",
      }),
      providesTags: ["LOCATION"],
    }),
  }),
});

export const {
  useCreateNewLocationMutation,
  useFindLocationQuery,
  useChangeLocationMutation,
} = locationApi;
