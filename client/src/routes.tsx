import { createBrowserRouter } from "react-router";
import Layout from "./pages/layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import RegisterForm from "./pages/auth/RegisterForm";
import LoginForm from "./pages/auth/LoginForm";
import Dashboard from "./pages/user/Dashboard";
import IsLogin from "./pages/protector/IsLogin";
import IsAdmin from "./pages/protector/isAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CreateCategory from "./pages/admin/CreateCategory";
import Users from "./pages/admin/Users";
import CreateProduct from "./pages/admin/CreateProduct";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/policy",
        element: <Policy />,
      },
      // user
      {
        path: "/dashboard/user",
        element: <IsLogin />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
      // admin
      {
        path: "/dashboard/admin",
        element: <IsAdmin />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "create-category",
            element: <CreateCategory />,
          },
          {
            path: "create-product",
            element: <CreateProduct />,
          },
          {
            path: "product/:slug",
            element: <UpdateProduct />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "products",
            element: <Products />,
          },
        ],
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);
