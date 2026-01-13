const CategoryTableSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          {/* Desktop Header Skeleton */}
          <thead className="hidden md:table-header-group bg-gray-100">
            <tr>
              <th className="px-6 py-3">
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </th>
              <th className="px-6 py-3">
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className="grid grid-cols-1 md:table-row p-4 md:p-0"
              >
                <td className="md:px-6 md:py-4">
                  <div className="h-4 w-40 bg-gray-300 rounded mb-2" />
                </td>

                <td className="md:px-6 md:py-4">
                  <div className="flex gap-2">
                    <div className="h-8 w-16 bg-gray-300 rounded" />
                    <div className="h-8 w-16 bg-gray-300 rounded" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTableSkeleton;
