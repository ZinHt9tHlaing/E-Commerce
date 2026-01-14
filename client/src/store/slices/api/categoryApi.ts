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

interface updateCategoryTypes {
  success: boolean;
  message: string;
  updatedCategory: GetAllCategoryTypes;
}

interface deleteCategoryTypes {
  success: boolean;
  message: string;
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
    updateCategory: builder.mutation<
      updateCategoryTypes,
      { id: string; name: string }
    >({
      query: (data) => ({
        url: `/category/update-category/${data.id}`,
        method: "PATCH",
        body: {
          name: data.name,
        },
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<deleteCategoryTypes, { id: string }>({
      query: (data) => ({
        url: `/category/delete-category/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
