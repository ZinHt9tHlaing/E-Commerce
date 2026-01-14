import AdminMenu from "@/components/admin/AdminMenu";
import CategoryForm from "@/components/admin/form/CategoryForm";
import CategoryTableSkeleton from "@/components/CategoryTableSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/store/slices/api/categoryApi";
import { useState } from "react";
import { toast } from "sonner";

const CreateCategory = () => {
  const { data: getAllCategoriesData, isLoading: getAllCategoryLoading } =
    useGetAllCategoriesQuery();
  const [updateCategoryMutation, { isLoading: updateCategoryLoading }] =
    useUpdateCategoryMutation();
  const [deleteCategoryMutation, { isLoading: deleteCategoryLoading }] =
    useDeleteCategoryMutation();

  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleUpdate = async (id: string) => {
    try {
      const response = await updateCategoryMutation({
        id,
        name: editText,
      }).unwrap();
      setEditText("");
      setEditId(null);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Update category error", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCategoryMutation({
        id,
      }).unwrap();
      setEditText("");
      setEditId(null);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Delete category error", error);
    }
  };

  return (
    <AdminMenu>
      <h2 className="text-2xl font-semibold mb-6">Manage Categories</h2>
      <div className="pt-3 pb-5 md:w-96 w-full">
        <CategoryForm />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-5">
        {getAllCategoryLoading ? (
          <div className="p-4 text-gray-500">
            <CategoryTableSkeleton />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="max-h-[328px] overflow-y-auto">
              <table className="min-w-full border-collapse">
                {/* Header */}
                <thead className="table-header-group bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      #
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y overflow-y-scroll">
                  {getAllCategoriesData?.categories &&
                  getAllCategoriesData?.categories.length > 0 ? (
                    getAllCategoriesData?.categories?.map((category, index) => (
                      <tr key={category._id}>
                        <td className="px-4 lg:px-6 py-4 text-sm font-medium">
                          {index + 1}
                        </td>

                        {/* Name */}
                        <td className="px-4 lg:px-6 py-3 text-sm">
                          {editId === category._id ? (
                            <Input
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full text-sm md:text-base px-2 md:px-3 py-1.5 md:py-2"
                            />
                          ) : (
                            <span className="font-medium text-gray-800">
                              {category.name}
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        {editId === category._id ? (
                          <td className="px-3 lg:px-6 py-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="active:scale-95 duration-100"
                                disabled={updateCategoryLoading}
                                onClick={() => handleUpdate(category._id)}
                              >
                                {updateCategoryLoading ? (
                                  <span className="animate-pulse">
                                    Saving...
                                  </span>
                                ) : (
                                  "Save"
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => setEditId(null)}
                                className="active:scale-95 duration-100"
                              >
                                Cancel
                              </Button>
                            </div>
                          </td>
                        ) : (
                          <td className="px-3 lg:px-6 py-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => {
                                  setEditId(category._id);
                                  setEditText(category.name);
                                }}
                                className="active:scale-95 duration-100"
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                className="active:scale-95 duration-100"
                                variant="destructive"
                                disabled={deleteCategoryLoading}
                                onClick={() => handleDelete(category._id)}
                              >
                                {deleteCategoryLoading ? (
                                  <span className="animate-pulse">
                                    Deleting...
                                  </span>
                                ) : (
                                  "Delete"
                                )}
                              </Button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-10 text-center text-sm text-gray-500"
                      >
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminMenu>
  );
};

export default CreateCategory;
