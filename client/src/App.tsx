import { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { setDefaultSettings } from "./config/app_config";
import Routers from "./routers";
import { fetchUserAsync } from "./slice/user.slice";

setDefaultSettings();

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUser = () => {
      dispatch(fetchUserAsync());
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
