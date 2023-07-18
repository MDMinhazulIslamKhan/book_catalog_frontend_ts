import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-tau.vercel.app/api/v1",
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from the state dynamically
      const token = getState().user.token;

      if (token) {
        headers.set("Authorization", `${token}`);
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["review", "book"],
});
