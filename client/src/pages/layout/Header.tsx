import { useState } from "react";
import { NavLink, Link } from "react-router";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const auth = true;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "text-blue-600 bg-blue-50"
        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
    }`;

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

            <NavLink to="/register" className={navLinkClass}>
              Register
            </NavLink>

            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>

            <NavLink to="/cart" className={navLinkClass}>
              <div className="relative flex items-center gap-1">
                <ShoppingCart size={18} />
                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1.5 text-xs text-white">
                  0
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
          <div className="flex flex-col gap-1">
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

            {auth ? (
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
                <NavLink
                  to="/categories"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/register"
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Logout
                </NavLink>
              </>
            )}

            <NavLink
              to="/cart"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              <Badge>Cart</Badge>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
