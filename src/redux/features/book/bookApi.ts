/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: ({
        page,
        limit,
        sortBy,
        sortOrder,
        searchTerm,
        exactSearch,
        matchSearch,
      }) =>
        `/book/get-all-books?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${matchSearch}&${searchTerm}=${exactSearch}`,
    }),
    getGenre: build.query({
      query: () => `/genre`,
    }),
    singleBook: build.query({
      query: (id) => `/book/get-single-book/${id}`,
      providesTags: ["review"],
    }),
    postReview: build.mutation({
      query: ({ id, data }) => ({
        url: `/book/review/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    postBook: build.mutation({
      query: (data) => ({
        url: `/book/add-book`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useSingleBookQuery,
  usePostReviewMutation,
  useGetGenreQuery,
  usePostBookMutation,
} = bookApi;
