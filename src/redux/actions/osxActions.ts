import { App } from "../reducers/osx";
import { AppPropTypes } from "../../components/apps";

export const OPEN_APP = "OPEN_APP";
export const CLOSE_APP = "CLOSE_APP";

interface AddAppAction {
  type: typeof OPEN_APP;
  pid: string;
  app: App;
}

interface CloseAppAction {
  type: typeof CLOSE_APP;
  pid: string;
}

export type OSXActionsType = AddAppAction | CloseAppAction;

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
      }
    }
  };
}

export function killApp(pid: string): CloseAppAction {
  return {
    type: CLOSE_APP,
    pid
  };
}