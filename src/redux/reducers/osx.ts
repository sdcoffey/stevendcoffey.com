import {
  OPEN_APP,
  CLOSE_APP,
  REQUEST_FOCUS,
  OSXActionsType
} from "../actions/osxActions";
import { AppPropTypes } from "../../components/apps";

export interface App {
  appType: React.ComponentClass<AppPropTypes>;
  appProps: AppPropTypes;
  pid: string;
}

export type ApplicationMap = App[];

export interface OSXState {
  apps: ApplicationMap;
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
  action: OSXActionsType
): OSXState {
  const { apps } = state;
  const appsWithoutTarget = apps.filter(a => a.pid !== action.pid);

  return {
    ...state,
    apps: appsWithoutTarget
  };
}

function handleRequestFocusAction(
  state: OSXState,
  action: OSXActionsType
): OSXState {
  const { apps } = state;

  const target = apps.find(app => app.pid === action.pid);
  if (!target) {
    return state;
  }

  const others = apps.filter(app => app.pid !== action.pid);

  return {
    ...state,
    apps: [target, ...others]
  };
}
