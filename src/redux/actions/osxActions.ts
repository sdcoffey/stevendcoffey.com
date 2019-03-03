import { App } from "../reducers/osx";
import { AppPropTypes } from "../../components/apps";

export const OPEN_APP = "OPEN_APP";
export const CLOSE_APP = "CLOSE_APP";
export const REQUEST_FOCUS = "REQUEST_FOCUS";

interface AddAppAction {
  type: typeof OPEN_APP;
  pid: string;
  app: App;
}

interface CloseAppAction {
  type: typeof CLOSE_APP;
  pid: string;
}

interface RequestFocusAction {
  type: typeof REQUEST_FOCUS;
  pid: string;
}

export type OSXActionsType = AddAppAction | CloseAppAction | RequestFocusAction;

function generatePid(): string {
  return (new Date().getTime() % 100000).toString();
}

export function openApp(
  appType: React.ComponentClass<AppPropTypes>
): AddAppAction {
  const pid = generatePid();

  return {
    type: OPEN_APP,
    pid,
    app: {
      appType,
      appProps: {
        pid
      },
      pid
    }
  };
}

export function closeApp(pid: string): CloseAppAction {
  return {
    type: CLOSE_APP,
    pid
  };
}

export function requestFocus(pid: string): RequestFocusAction {
  return {
    type: REQUEST_FOCUS,
    pid
  };
}
