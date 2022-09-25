import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { getAllFollowingRequested } from "../redux/slice/following_slice";
import { getUserInfoRequested } from "../redux/slice/user_slice";
import ProtectedRoute from "./protected_route";
import { routesPath } from "./route";

const Routers = () => {
  console.log("Routers render");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    const fetchFollowing = () => {
      dispatch(getAllFollowingRequested());
    };
    const fetchUser = () => {
      dispatch(getUserInfoRequested());
    };
    if (user.data) {
      fetchFollowing();
    } else {
      fetchUser();
    }
  }, [dispatch, user.data]);

  return (
    <Router>
      <Routes>
        {routesPath.map((route, index) => {
          if (route.authRequired) {
            return (
              <Route
                path={route.path}
                key={index}
                element={<ProtectedRoute isAuth={user} redirectTo="/" />}
              >
                <Route index element={<route.element />} />
              </Route>
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
