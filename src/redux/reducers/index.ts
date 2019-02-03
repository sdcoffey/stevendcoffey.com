import { combineReducers } from "redux";

import terminal, { TerminalState } from "./terminal";

export interface State {
  terminal: TerminalState;
}

export default combineReducers({
  terminal
});
