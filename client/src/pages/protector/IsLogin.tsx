import { useCurrentUserQuery } from "@/store/slices/api/userApi";
import { clearUserInfo } from "@/store/slices/auth/auth";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

const IsLogin = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { isError } = useCurrentUserQuery();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!userInfo || isError) {
      navigate("/login");
      dispatch(clearUserInfo());
    }
  }, [userInfo, isError]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default IsLogin;
