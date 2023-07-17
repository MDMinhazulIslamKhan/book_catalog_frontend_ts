/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: ({ page, limit, sortBy, sortOrder, searchTerm, search, other }) =>
        `/book/get-all-books?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${searchTerm}&${search}=${other}`,
    }),
    singleBook: build.query({
      query: (id) => `/book/get-single-book/${id}`,
      providesTags: ["review"],
    }),
    postReview: build.mutation({
      query: ({ id, data }) => ({
        url: `/book/review/${id}`,
        method: "POST",
        headers: data.token,
        body: data.review,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useSingleBookQuery,
  usePostReviewMutation,
} = bookApi;
