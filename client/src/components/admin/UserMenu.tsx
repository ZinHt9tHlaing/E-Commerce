import { NavLink } from "react-router";

interface UserMenuProps {
  children: React.ReactNode;
}

const UserMenu = ({ children }: UserMenuProps) => {
  return (
    <div className="container grid grid-cols-12 gap-3">
      <div className="col-span-5 lg:col-span-5">
        <div className="text-center">
          <div className="inline-block w-52 lg:w-60 text-left bg-white shadow-md rounded-md overflow-hidden">
            <h4 className="text-xl font-semibold p-4 border-b">Dashboard</h4>
            <nav className="flex flex-col">
              <NavLink
                to="/dashboard/user/profile"
                className={({ isActive }) =>
                  `px-4 py-3 hover:bg-gray-200 transition-colors ${
                    isActive
                      ? "bg-sky-600 text-white font-semibold hover:bg-sky-700"
                      : ""
                  }`
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/dashboard/user/orders"
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
            </nav>
          </div>
        </div>
      </div>
      <div className="col-span-7 lg:col-span-7">{children}</div>
    </div>
  );
};

export default UserMenu;
