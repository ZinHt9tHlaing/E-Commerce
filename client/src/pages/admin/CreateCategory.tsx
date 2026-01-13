import AdminMenu from "@/components/admin/AdminMenu";
import CategoryForm from "@/components/admin/form/CategoryForm";
import CategoryTableSkeleton from "@/components/CategoryTableSkeleton";
import { Button } from "@/components/ui/button";
import { useGetAllCategoriesQuery } from "@/store/slices/api/categoryApi";

const CreateCategory = () => {
  const { data, isLoading: getAllCategoryLoading } = useGetAllCategoriesQuery();

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
                  {data?.categories && data?.categories.length > 0 ? (
                    data?.categories?.map((category, index) => (
                      <tr key={category._id}>
                        <td className="px-4 lg:px-6 py-4 text-sm font-medium">
                          {index + 1}
                        </td>

                        {/* Name */}
                        <td className="px-4 lg:px-6 py-3 text-sm">
                          <span className="font-medium text-gray-800 line-clamp-1 lg:line-clamp-none">
                            {category.name}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-3 lg:px-6 py-3">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="active:scale-95 duration-100"
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              className="active:scale-95 duration-100"
                              variant="destructive"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
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
