import axios from "axios";
import { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import Routers from "./routers";
import { fetchUserAsync } from "./slice/user.slice";
localStorage.setItem("volume", String(0.1));
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

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
