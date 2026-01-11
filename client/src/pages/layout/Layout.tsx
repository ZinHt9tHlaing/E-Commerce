import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}

const Layout = ({ title, description, keywords, author }: Props) => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="mt-5 flex-1 md:px-0 lg:px-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "react,node,express,mongodb",
  author: "ZHH",
};

export default Layout;
