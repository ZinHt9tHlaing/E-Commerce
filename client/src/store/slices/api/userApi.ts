import { apiSlice } from "../apiSlice";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  name: string;
  phone: string;
  address: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterInput) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: (data: LoginInput) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice;
