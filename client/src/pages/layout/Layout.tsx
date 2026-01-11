import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="mt-5 flex-1 md:px-0 lg:px-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
