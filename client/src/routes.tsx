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
      {
        path: "/dashboard/user",
        element: <IsLogin />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/dashboard/admin",
        element: <IsAdmin />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
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
