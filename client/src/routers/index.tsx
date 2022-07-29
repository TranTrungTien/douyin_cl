import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routesPath } from "./route";

const Routers = () => {
  return (
    <Router>
      <Routes>
        {routesPath.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </Router>
  );
};

export default Routers;
