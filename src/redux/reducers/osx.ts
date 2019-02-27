import * as React from "react";

import {
  ADD_WINDOW,
  CLOSE_WINDOW,
  OSXActionsType
} from "../actions/osxActions";

export interface WindowProps {
  windowType: React.ComponentClass;
}

export type WindowMap = { [key: string]: WindowProps };

export interface OSXState {
  windows: WindowMap;
}

const initialState: OSXState = {
  windows: {}
};

export default function osxReducer(
  state = initialState,
  action: OSXActionsType
) {
  switch (action.type) {
    case ADD_WINDOW:
      return {
        ...state,
        windows: {
          [action.windowKey]: action.props,
          ...state.windows
        }
      };
    case CLOSE_WINDOW:
      const { windows } = state;
      delete windows[action.windowKey];
      return {
        ...state,
        windows
      };
    default:
      return initialState;
  }
}
