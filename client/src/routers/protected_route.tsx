import { ReactNode, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Loading } from "../components";
import { IInitialState } from "../redux/slice/user_slice";

type Props = {
  isAuth: IInitialState;
  redirectTo: string;
  children?: ReactNode[] | ReactNode;
};

const ProtectedRoute = ({ isAuth, redirectTo }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth.data && isAuth.error) {
      navigate(redirectTo, {
        replace: true,
      });
    }
  }, [isAuth, navigate, redirectTo]);
  return (
    <>
      {isAuth.status === "idle" || isAuth.status === "loading" ? (
        <Loading />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default ProtectedRoute;
