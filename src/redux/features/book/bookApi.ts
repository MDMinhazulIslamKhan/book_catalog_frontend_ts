import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: () => "/book/get-all-books",
    }),
  }),
});

export const { useGetAllBooksQuery } = bookApi;
