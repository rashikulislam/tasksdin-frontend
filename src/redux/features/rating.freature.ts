import { baseApi } from "../baseApi";

const ratingApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GIVE RATING
    giveRating: builder.mutation({
      query: (payload) => ({
        url: "/rating/sent",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGiveRatingMutation } = ratingApi;
