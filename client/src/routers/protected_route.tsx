import React, { ReactNode, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Loading } from "../components";

type Props = {
  isAuth: boolean;
  redirectTo: string;
  children?: ReactNode[] | ReactNode;
};

const ProtectedRoute = ({ isAuth, redirectTo, children }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate(redirectTo, {
        replace: true,
      });
    }
  }, [isAuth, navigate, redirectTo]);
  return (
    <>
      {isAuth ? (
        children ? (
          Array.isArray(children) ? (
            <Outlet />
          ) : (
            children
          )
        ) : null
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProtectedRoute;
