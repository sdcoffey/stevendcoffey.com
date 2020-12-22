import { combineReducers } from "redux";

import terminal, { HOME } from "./terminal";

export { HOME };

export default combineReducers({
  terminal,
});
