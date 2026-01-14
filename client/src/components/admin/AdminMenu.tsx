import { NavLink } from "react-router";

interface AdminMenuProps {
  children: React.ReactNode;
}

const AdminMenu = ({ children }: AdminMenuProps) => {
  return (
    <div className="container mx-auto px-3">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <aside className="lg:col-span-3">
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <h4 className="text-lg lg:text-xl font-semibold p-4 border-b text-center lg:text-left">
              Admin Panel
            </h4>

            {/* Mobile = horizontal | Desktop = vertical */}
            <nav className="flex flex-row lg:flex-col">
              {[
                {
                  to: "/dashboard/admin/create-category",
                  label: "Create Category",
                },
                {
                  to: "/dashboard/admin/create-product",
                  label: "Create Product",
                },
                {
                  to: "/dashboard/admin/products",
                  label: "Products",
                },
                {
                  to: "/dashboard/admin/orders",
                  label: "Orders",
                },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex-1 lg:flex-none text-center lg:text-left px-3 py-2 lg:px-4 lg:py-3 text-xs lg:text-base transition-colors
                    ${
                      isActive
                        ? "bg-sky-600 text-white font-semibold"
                        : "hover:bg-gray-100"
                    }
                  `
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
};

export default AdminMenu;
