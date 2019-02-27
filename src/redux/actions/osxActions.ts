export const ADD_WINDOW = "ADD_WINDOW";
export const CLOSE_WINDOW = "CLOSE_WINDOW";

interface AddWindowAction {
  type: typeof ADD_WINDOW;
  windowKey: string;
}

interface CloseWindowAction {
  type: typeof CLOSE_WINDOW;
  windowKey: string;
}

export type OSXActionsType = AddWindowAction | CloseWindowAction;

export function addWindow(windowKey: string): AddWindowAction {
  return {
    type: ADD_WINDOW,
    windowKey
  };
}

export function closeWindow(windowKey: string): CloseWindowAction {
  return {
    type: CLOSE_WINDOW,
    windowKey
  };
}
