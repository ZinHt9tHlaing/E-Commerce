import { NavLink } from "react-router";

interface AdminMenuProps {
  children: React.ReactNode;
}

const AdminMenu = ({ children }: AdminMenuProps) => {
  return (
    <div className="container grid grid-cols-12 gap-3">
      <div className="col-span-5 lg:col-span-5">
        <div className="text-center">
          <div className="inline-block w-52 lg:w-60 text-left bg-white shadow-md rounded-md overflow-hidden">
            <h4 className="text-xl font-semibold p-4 border-b">Admin Panel</h4>
            <nav className="flex flex-col">
              <NavLink
                to="/dashboard/admin/create-category"
                className={({ isActive }) =>
                  `px-4 py-3 hover:bg-gray-200 transition-colors ${
                    isActive
                      ? "bg-sky-600 text-white font-semibold hover:bg-sky-700"
                      : ""
                  }`
                }
              >
                Create Category
              </NavLink>
              <NavLink
                to="/dashboard/admin/create-product"
                className={({ isActive }) =>
                  `px-4 py-3 hover:bg-gray-200 transition-colors ${
                    isActive
                      ? "bg-sky-600 text-white font-semibold hover:bg-sky-700"
                      : ""
                  }`
                }
              >
                Create Product
              </NavLink>
              <NavLink
                to="/dashboard/admin/products"
                className={({ isActive }) =>
                  `px-4 py-3 hover:bg-gray-200 transition-colors ${
                    isActive
                      ? "bg-sky-600 text-white font-semibold hover:bg-sky-700"
                      : ""
                  }`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/dashboard/admin/orders"
                className={({ isActive }) =>
                  `px-4 py-3 hover:bg-gray-200 transition-colors ${
                    isActive
                      ? "bg-sky-600 text-white font-semibold hover:bg-sky-700"
                      : ""
                  }`
                }
              >
                Orders
              </NavLink>
              {/* Uncomment if needed
          <NavLink
            to="/dashboard/admin/users"
            className={({ isActive }) =>
                  `px-4 py-3 hover:bg-gray-200 transition-colors ${
                    isActive
                      ? "bg-sky-600 text-white font-semibold hover:bg-sky-700"
                      : ""
                  }`
                }
          >
            Users
          </NavLink>
          */}
            </nav>
          </div>
        </div>
      </div>
      <div className="col-span-7 lg:col-span-7">{children}</div>
    </div>
  );
};

export default AdminMenu;
