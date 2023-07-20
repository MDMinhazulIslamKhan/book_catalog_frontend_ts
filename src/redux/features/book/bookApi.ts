import { BookInputData, SearchData } from "../../../types";
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
      }: SearchData) =>
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
      }: SearchData) =>
        `/book/get-own-books?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${matchSearch}&${searchTerm}=${exactSearch}`,
      providesTags: ["book"],
    }),
    getGenre: build.query({
      query: () => `/genre`,
    }),
    singleBook: build.query({
      query: (id: string) => `/book/get-single-book/${id}`,
      providesTags: ["review"],
    }),
    postReview: build.mutation({
      query: ({ id, data }: { id: string; data: { review: string } }) => ({
        url: `/book/review/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    postBook: build.mutation({
      query: (data: BookInputData) => ({
        url: `/book/add-book`,
        method: "POST",
        body: data,
      }),
    }),
    updateBook: build.mutation({
      query: ({ id, data }: { id: string; data: BookInputData }) => ({
        url: `/book/update-book/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBook: build.mutation({
      query: (id: string) => ({
        url: `/book/delete-book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
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
