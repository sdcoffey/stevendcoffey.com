export { configureStore } from "./store";
export { default as reducer, HOME } from "./reducers";
export { clearCurrentInput, setCurrentInput, setCursorIndex, submit, updateCwd } from "./actions";
export type {
  CurrentInput,
  TerminalActionsType as Actions,
  Dispatch,
  Input,
  Output,
  ReduxStore,
  Row,
  State,
} from "./types";
