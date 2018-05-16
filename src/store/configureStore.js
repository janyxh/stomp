import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "./middleware/promiseMiddleware";
import createLogger from "redux-logger";
import targetReducer from "../reducers";

export default function configureStore() {
  let finalCreateStore;
  if (process.env.NODE_ENV === "development") {
    const { persistState } = require("redux-devtools");
    const DevTools = require("../containers/DevTools/index").default;
    finalCreateStore = compose(
      applyMiddleware(
        promiseMiddleware()
        //createLogger()
      ),
      window.devToolsExtension
        ? window.devToolsExtension()
        : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(promiseMiddleware())(createStore);
  }
  const store = finalCreateStore(targetReducer, {});
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
