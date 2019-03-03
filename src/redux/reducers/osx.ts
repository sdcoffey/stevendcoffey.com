import {
  OPEN_APP,
  CLOSE_APP,
  REQUEST_FOCUS,
  CloseAppAction,
  RequestFocusAction,
  OSXActionsType
} from "../actions/osxActions";

import { App } from "../../registry/osx/AppRegistry";

export interface OSXState {
  apps: App[];
}

const initialState: OSXState = {
  apps: []
};

export default function osxReducer(
  state = initialState,
  action: OSXActionsType
): OSXState {
  switch (action.type) {
    case OPEN_APP:
      return {
        apps: [action.app, ...state.apps]
      };
    case CLOSE_APP:
      return handleCloseAppAction(state, action);
    case REQUEST_FOCUS:
      return handleRequestFocusAction(state, action);
    default:
      return state;
  }
}

function handleCloseAppAction(
  state: OSXState,
  action: CloseAppAction
): OSXState {
  const { apps } = state;
  const appsWithoutTarget = apps.filter(a => a.name !== action.name);

  return {
    ...state,
    apps: appsWithoutTarget
  };
}

function handleRequestFocusAction(
  state: OSXState,
  action: RequestFocusAction
): OSXState {
  const { apps } = state;

  const target = apps.find(app => app.name === action.name);
  if (!target) {
    return state;
  }

  const others = apps.filter(app => app.name !== action.name);

  return {
    ...state,
    apps: [target, ...others]
  };
}
