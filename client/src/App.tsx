import { useEffect } from "react";
import "./style/global.css";
import { useAppDispatch, useAppSelector } from "./redux/app/hooks";
import Routers from "./routers";
import { getUserInfoRequested } from "./redux/slice/user_slice";
import { getAllFollowingRequested } from "./redux/slice/following_slice";
import { setDefaultSettings } from "./config/config";

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
    <div className="App hidden laptop:block bg-dark_blue">
      <Routers />
    </div>
  );
}

export default App;
