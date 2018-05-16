import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import configureStore from "./store/configureStore";
import rootRoutes from "./routers";
import Tool from "./containers/DevTools";

require("es6-shim"); // 兼容IE 10
require("babel-polyfill");

// const devTool = process.env.NODE_ENV === "development" ? <Tool /> : null;
export const store = configureStore();

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={rootRoutes} />
    </div>
  </Provider>,
  document.getElementById("root")
);
