import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/app/hooks";
import { setDefaultSettings } from "./config/app_config";
import Routers from "./routers";
import { getUserInfoRequested } from "./redux/slice/user.slice";
import { getAllFollowingRequested } from "./redux/slice/following_slice";
// import { fetchUserAsync } from "./redux/slice/user.slice";

setDefaultSettings();

function App() {
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
    <div className="App hidden laptop:block">
      <Routers />
    </div>
  );
}

export default App;
