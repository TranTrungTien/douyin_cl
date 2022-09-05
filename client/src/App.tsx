import { useEffect } from "react";
import { setDefaultSettings } from "./config/config";
import { useAppDispatch, useAppSelector } from "./redux/app/hooks";
import { getAllFollowingRequested } from "./redux/slice/following_slice";
import { getUserInfoRequested } from "./redux/slice/user_slice";
import Routers from "./routers";
import "./style/global.css";

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
    <div className="App hidden laptop:block bg-light_blue w-full overflow-x-hidden">
      <Routers />
    </div>
  );
}

export default App;
