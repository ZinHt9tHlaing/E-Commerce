import { apiSlice } from "../apiSlice";

interface createProductTypes {
  success: boolean;
  message: string;
}

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<createProductTypes, FormData>({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useCreateProductMutation } = productApiSlice;
