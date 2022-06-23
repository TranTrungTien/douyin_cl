import React from "react";
import * as ReactDom from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
const root = ReactDom.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
