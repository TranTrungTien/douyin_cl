import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { getAllFollowingRequested } from "../redux/slice/following_slice";
import { getUserInfoRequested } from "../redux/slice/user_slice";
import ProtectedRoute from "./protected_route";
import { routesPath } from "./route";

const Routers = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  useEffect(() => {
    const fetchFollowing = () => {
      dispatch(getAllFollowingRequested());
    };
    const fetchUser = () => {
      dispatch(getUserInfoRequested());
    };
    if (user) {
      fetchFollowing();
    } else {
      fetchUser();
    }
  }, [dispatch, user]);
  return (
    <Router>
      <Routes>
        {routesPath.map((route, index) => {
          if (route.authRequired) {
            return (
              <Route
                path={route.path}
                key={index}
                element={
                  <ProtectedRoute isAuth={user ? true : false} redirectTo="/">
                    <Route index element={<route.element />} />
                  </ProtectedRoute>
                }
              />
            );
          } else
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            );
        })}
      </Routes>
    </Router>
  );
};

export default Routers;
