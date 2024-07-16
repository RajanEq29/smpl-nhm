/* eslint-disable linebreak-style */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Admin = createApi({
  reducerPath: "Admin",
  tagTypes: ["admin"],
  baseQuery: fetchBaseQuery({
    // staging url
    baseUrl: "https://backend.nhmdashboard.in",
    //  baseUrl: "http://localhost:5400",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    AdminLoginUser: builder.mutation({
      query: (data) => ({
        url: "/api/users/login",
        method: "post",
        body: data,
      }),
      //   invalidatesTags: ["college"],
    }),
    InboundcallApi: builder.mutation({
      query: (data) => ({
        url: "/api/callStatus/addCallStatus",
        method: "post",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const { useAdminLoginUserMutation, useInboundcallApiMutation } = Admin;
