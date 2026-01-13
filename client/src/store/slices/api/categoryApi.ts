import { apiSlice } from "../apiSlice";

interface GetAllCategoryTypes {
  categories: {
    _id: string;
    name: string;
    slug: string;
  }[];
}

interface CreateCategoryTypes {
  name: string;
}

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<GetAllCategoryTypes, void>({
      query: () => "/category/get-all-categories",
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<void, CreateCategoryTypes>({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useCreateCategoryMutation } =
  categoryApiSlice;
