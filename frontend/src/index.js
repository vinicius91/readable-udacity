import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

import reducer from "./reducers";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";

const logger = store => next => (action) => {
  // eslint-disable-line arrow-parens
  console.group(action.type); // eslint-disable-line no-console
  console.info("dispatching", action); // eslint-disable-line no-console
  const result = next(action); // eslint-disable-line no-console
  console.log("next state", store.getState()); // eslint-disable-line no-console
  console.groupEnd(action.type); // eslint-disable-line no-console
  return result;
};

// prettier-ignore
const composeEnhancers =
 window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle

const store = createStore(reducer, composeEnhancers(applyMiddleware(logger)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
