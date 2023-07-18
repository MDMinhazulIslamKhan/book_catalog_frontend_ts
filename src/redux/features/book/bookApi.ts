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
    getOwnBooks: build.query({
      query: ({
        page,
        limit,
        sortBy,
        sortOrder,
        searchTerm,
        exactSearch,
        matchSearch,
      }) =>
        `/book/get-own-books?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${matchSearch}&${searchTerm}=${exactSearch}`,
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
    updateBook: build.mutation({
      query: ({ id, data }) => ({
        url: `/book/update-book/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBook: build.mutation({
      query: (id) => ({
        url: `/book/delete-book/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetOwnBooksQuery,
  useSingleBookQuery,
  usePostReviewMutation,
  useGetGenreQuery,
  usePostBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
