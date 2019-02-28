import { ADD_APP, CLOSE_APP, OSXActionsType } from "../actions/osxActions";
import { AppPropTypes } from "../../components/apps";

export interface App {
  appType: React.ComponentClass<AppPropTypes>;
  appProps: AppPropTypes;
}

export type ApplicationMap = { [pid: string]: App };

export interface OSXState {
  apps: ApplicationMap;
}

const initialState: OSXState = {
  apps: {}
};

export default function osxReducer(
  state = initialState,
  action: OSXActionsType
): OSXState {
  switch (action.type) {
    case ADD_APP:
      return {
        ...state,
        apps: {
          [action.pid]: action.app,
          ...state.apps
        }
      };
    case CLOSE_APP:
      const { apps } = state;
      delete apps[action.pid];
      return {
        ...state,
        apps
      };
    default:
      return initialState;
  }
}
