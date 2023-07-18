/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `/auth/signin`,
        method: "POST",
        body: data,
      }),
    }),
    registration: build.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    addWishlist: build.mutation({
      query: (id) => ({
        url: `/user/add-book-into-wishlist/${id}`,
        method: "POST",
      }),
    }),
    addBooklist: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/add-book-into-booklist/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    updateBooklist: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/update-booklist/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    profile: build.query({
      query: () => `/user`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useProfileQuery,
  useAddWishlistMutation,
  useAddBooklistMutation,
  useUpdateBooklistMutation,
} = bookApi;
