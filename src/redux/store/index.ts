import thunk from "redux-thunk";

import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

import { Actions } from "../actions";
import rootReducer, { State } from "../reducers";

export type ReduxStore = Store<State, Actions>;
export type GetState = () => State;
export type PromiseAction = Promise<Actions>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => void;
export type Dispatch = (
  action: Actions | ThunkAction | PromiseAction | Array<Actions>
) => any;

export function configureStore() {
  const middleware = [thunk];
  if (process.env.NODE_ENV === "development") {
    const logger = createLogger({});
    // @ts-ignore
    middleware.push(logger);
  }

  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
