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

interface ForgotPasswordInput {
  email: string;
  newPassword: string;
}

interface UserTypes {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  answer: string;
  role: "user" | "admin";
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
    currentUser: builder.query<UserTypes, void>({
      query: () => "/user/get-user-info",
      providesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (data: ForgotPasswordInput) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserQuery,
  useForgotPasswordMutation,
} = authApiSlice;
