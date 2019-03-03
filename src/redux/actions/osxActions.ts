import { GetState, Dispatch, ThunkAction } from "../store";
import { App } from "../../registry/osx";

export const OPEN_APP = "OPEN_APP";
export const CLOSE_APP = "CLOSE_APP";
export const REQUEST_FOCUS = "REQUEST_FOCUS";

export interface OpenAppAction {
  type: typeof OPEN_APP;
  app: App;
}

export interface CloseAppAction {
  type: typeof CLOSE_APP;
  name: string;
}

export interface RequestFocusAction {
  type: typeof REQUEST_FOCUS;
  name: string;
}

export type OSXActionsType =
  | OpenAppAction
  | CloseAppAction
  | RequestFocusAction;

export function openApp(app: App): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const { apps } = getState().osx;

    const existingApp = apps.find(_app => _app.name === app.name);

    if (!!existingApp) {
      dispatch(requestFocus(existingApp.name));
    } else {
      dispatch({
        type: OPEN_APP,
        app
      });
    }
  };
}

export function closeApp(name: string): CloseAppAction {
  return {
    type: CLOSE_APP,
    name
  };
}

export function requestFocus(name: string): RequestFocusAction {
  return {
    type: REQUEST_FOCUS,
    name
  };
}
