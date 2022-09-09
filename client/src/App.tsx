import { setDefaultSettings } from "./config/config";
import Routers from "./routers";
import "./style/global.css";

setDefaultSettings();
localStorage.removeItem("had_seen");

function App() {
  return (
    <div className="App hidden laptop:block bg-light_blue w-full overflow-x-hidden">
      <Routers />
    </div>
  );
}

export default App;
