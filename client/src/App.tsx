import axios from "axios";
import "./App.css";
import Routers from "./routers";
localStorage.setItem("volume", String(0.1));
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  console.log(process.env.REACT_APP_BASE_URL);

  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;
