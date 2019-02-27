import { combineReducers } from "redux";

import terminal, { TerminalState } from "./terminal";
import osx, { OSXState } from "./osx";

export interface State {
  osx: OSXState;
  terminal: TerminalState;
}

export default combineReducers({
  osx,
  terminal
});
