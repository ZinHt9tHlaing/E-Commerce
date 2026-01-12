import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useCurrentUserQuery } from "@/store/slices/api/userApi";

const IsAdmin = () => {
  const userInfo = useSelector((state: RootState) => state.auth?.userInfo);
  const { data: user, isError, isLoading } = useCurrentUserQuery({});
  const navigate = useNavigate();

  console.log("user", user);

  useEffect(() => {
    if (isLoading) return;

    if (!userInfo || isError) {
      navigate("/login");
    }

    if (user?.role !== "admin") navigate("/");
  }, [userInfo, isError, user, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default IsAdmin;
