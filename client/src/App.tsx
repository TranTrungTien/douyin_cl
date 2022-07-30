import { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./redux/app/hooks";
import { setDefaultSettings } from "./config/app_config";
import Routers from "./routers";
import { getUserInfoRequested } from "./redux/slice/user.slice";
// import { fetchUserAsync } from "./redux/slice/user.slice";

setDefaultSettings();

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUser = () => {
      dispatch(getUserInfoRequested());
    };
    fetchUser();
  }, [dispatch]);
  return (
    <div className="App hidden laptop:block">
      <Routers />
    </div>
  );
}

export default App;
