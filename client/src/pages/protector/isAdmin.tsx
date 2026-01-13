import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useCurrentUserQuery } from "@/store/slices/api/userApi";
import Spinner from "@/components/Spinner";

const IsAdmin = () => {
  const userInfo = useSelector((state: RootState) => state.auth?.userInfo);
  const { data: user, isError, isLoading } = useCurrentUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!userInfo || isError) {
      navigate("/login");
    }

    if (user?.role !== "admin") navigate("/");
  }, [userInfo, isError, user, navigate, isLoading]);

  if (isLoading) {
    return <Spinner redirectTo="/login" seconds={3} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default IsAdmin;
