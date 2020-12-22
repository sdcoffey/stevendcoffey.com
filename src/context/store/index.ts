import thunk from "redux-thunk";

import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

import { TerminalActionsType, State } from "../types";
import rootReducer from "../reducers";

export function configureStore() {
  const middleware = [thunk];
  if (process.env.NODE_ENV === "development") {
    const logger = createLogger({});
    // @ts-ignore
    middleware.push(logger);
  }

  return createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
}
