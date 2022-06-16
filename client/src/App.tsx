import "./App.css";
import Routers from "./routers";
localStorage.setItem("volume", String(0.1));

function App() {
  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;
