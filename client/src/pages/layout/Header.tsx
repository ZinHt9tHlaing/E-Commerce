import { useState } from "react";
import { NavLink, Link } from "react-router";
import { ShoppingCart, Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from "@/store/slices/api/userApi";
import { toast } from "sonner";
import { clearUserInfo } from "@/store/slices/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { data: user } = useCurrentUserQuery();

  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "text-blue-600 bg-blue-50"
        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
    }`;

  const logoutHandler = async () => {
    try {
      const response = await logoutMutation({});
      dispatch(clearUserInfo());
      toast.success(response.data.message);
      setOpen(false);
      // dispatch(apiSlice.util.resetApiState()); // Reset and clean out the API state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-lg font-bold flex items-center gap-2">
            <ShoppingCart /> E-commerce
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              >
                Categories
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-44 rounded-md bg-white shadow-lg border">
                  <Link
                    to="/categories"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setDropdown(false)}
                  >
                    All Categories
                  </Link>
                </div>
              )}
            </div>

            {!userInfo ? (
              <>
                <NavLink
                  to="/login"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {" "}
                    <div className="flex items-center">
                      <User className="w-5 h-5" />
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="font-semibold text-center">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="group" asChild>
                      <Link
                        to={`/dashboard/${
                          user?.role === "admin" ? "admin" : "user"
                        }`}
                        className="cursor-pointer"
                      >
                        <User
                          className="mr-2 size-4 transition-all duration-300 ease-in-out group-hover:scale-110"
                          aria-hidden="true"
                        />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      disabled={isLoading}
                      className="group"
                      onClick={logoutHandler}
                      asChild
                    >
                      <Link to="/login" className="text-red-600 cursor-pointer">
                        <LogOut
                          className="mr-2 size-4 text-red-600 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-95"
                          aria-hidden="true"
                        />
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            <NavLink to="/cart" className={navLinkClass}>
              <div className="relative flex items-center gap-1">
                <ShoppingCart size={18} />
                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1.5 text-xs text-white">
                  1
                </span>
              </div>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 pb-4">
          <div className="flex flex-col justify-center items-center gap-1 mt-3">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/categories"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Categories
            </NavLink>

            {!userInfo ? (
              <>
                <NavLink
                  to="/login"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={`${navLinkClass} cursor-pointer`}
                  >
                    <div className="flex items-center gap-0">
                      <User className="w-5 h-5" />
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="font-semibold text-center">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="group" asChild>
                      <Link
                        to={`/dashboard/${
                          user?.role === "admin" ? "admin" : "user"
                        }`}
                        className="cursor-pointer"
                      >
                        <User
                          className="mr-2 size-4 transition-all duration-300 ease-in-out group-hover:scale-110"
                          aria-hidden="true"
                        />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      disabled={isLoading}
                      className="group"
                      onClick={logoutHandler}
                      asChild
                    >
                      <Link to="/login" className="text-red-600 cursor-pointer">
                        <LogOut
                          className="mr-2 size-4 text-red-600 transition-all duration-200 group-hover:translate-x-1 group-hover:text-red-500 group-hover:scale-95"
                          aria-hidden="true"
                        />
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            <NavLink to="/cart" className={navLinkClass}>
              <div className="relative flex items-center gap-1">
                <ShoppingCart size={18} />
                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1.5 text-xs text-white">
                  0
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
