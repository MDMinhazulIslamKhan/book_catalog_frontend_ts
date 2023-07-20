import { LoginInputData, RegistrationInputData } from "../../../types";
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: LoginInputData) => ({
        url: `/auth/signin`,
        method: "POST",
        body: data,
      }),
    }),
    registration: build.mutation({
      query: (data: RegistrationInputData) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    addWishlist: build.mutation({
      query: (id: string) => ({
        url: `/user/add-book-into-wishlist/${id}`,
        method: "POST",
      }),
    }),
    addBooklist: build.mutation({
      query: ({ id, data }: { id: string; data: { status: string } }) => ({
        url: `/user/add-book-into-booklist/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    updateBooklist: build.mutation({
      query: ({ id, data }: { id: string; data: { status: string } }) => ({
        url: `/user/update-booklist/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    profile: build.query({
      query: () => `/user`,
      providesTags: ["book"],
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
