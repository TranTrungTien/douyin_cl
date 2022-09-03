import { useEffect } from "react";
import "./style/global.css";
import { useAppDispatch, useAppSelector } from "./redux/app/hooks";
import Routers from "./routers";
import { getUserInfoRequested } from "./redux/slice/user_slice";
import { getAllFollowingRequested } from "./redux/slice/following_slice";
import { setDefaultSettings } from "./config/config";
import axios from "axios";

setDefaultSettings();

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/recommendation/list")
      .then((res) => console.log(res.data))
      .catch(console.error);
  }, []);
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
