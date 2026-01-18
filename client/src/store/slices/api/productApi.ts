import { apiSlice } from "../apiSlice";
import type { GetAllCategoryTypes } from "./categoryApi";

export interface GetCategoryTypes {
  _id: string;
  name: string;
  slug: string;
}

interface createProductTypes {
  success: boolean;
  message: string;
}

interface updateProductTypes extends createProductTypes {
  product: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    category: GetCategoryTypes;
    quantity: number;
    photo: {
      _id: string;
      url: string;
      public_alt: string;
    }[];
    shipping: boolean;
  };
}

interface GetAllProductTypes {
  success: boolean;
  countTotal: number;
  message: string;
  products: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: GetAllCategoryTypes;
    quantity: number;
    // photo: string[];
    shipping: boolean;
  }[];
}

interface GetSingleProductTypes {
  success: boolean;
  countTotal: number;
  message: string;
  product: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: GetCategoryTypes;
    quantity: number;
    // photo: string[];
    shipping: boolean;
  };
}

interface GetProductPhoto {
  success: boolean;
  message: string;
  product: {
    _id: string;
    url: string;
    public_alt: string;
  }[];
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

    getAllProducts: builder.query<GetAllProductTypes, void>({
      query: () => "/product/get-all-products",
      providesTags: ["Product"],
    }),

    getProductPhotoById: builder.query<GetProductPhoto, string>({
      query: (id: string) => `/product/get-product-photo/${id}`,
      providesTags: ["Product"],
    }),

    getSingleProduct: builder.query<GetSingleProductTypes, string>({
      query: (slug: string) => `/product/get-single-product/${slug}`,
      providesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      updateProductTypes,
      { id: string; formData: FormData }
    >({
      query: (data) => ({
        url: `/product/update-product/${data.id}`,
        method: "PATCH",
        body: data.formData,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<string, string>({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductPhotoByIdQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
