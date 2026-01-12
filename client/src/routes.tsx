import { createBrowserRouter } from "react-router";
import Layout from "./pages/layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import RegisterForm from "./pages/auth/RegisterForm";
import LoginForm from "./pages/auth/LoginForm";

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
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
    ],
  },
]);
