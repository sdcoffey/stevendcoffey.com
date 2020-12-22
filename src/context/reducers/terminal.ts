import { AddInputAction, AddOutputAction, TerminalActions, TerminalState, TerminalActionsType } from "../types";

export const HOME = "/home/steve";

const initialState: TerminalState = {
  cwd: HOME,
  env: {
    PATH: "/bin",
    PWD: HOME,
  },
  currentInput: {
    value: "",
    cursorIndex: 0,
  },
  rows: [],
};

export default function terminalReducer(state = initialState, action: TerminalActionsType) {
  switch (action.type) {
    case TerminalActions.AddInput:
      const inputAction = action as AddInputAction;
      return {
        ...state,
        rows: [...state.rows, inputAction.input],
      };
    case TerminalActions.AddOutput:
      const outputAction = action as AddOutputAction;
      return {
        ...state,
        rows: [...state.rows, outputAction.output],
      };
    case TerminalActions.ClearInputs:
      return {
        ...state,
        rows: [],
      };
    case TerminalActions.ClearCurrentInput:
      return {
        ...state,
        currentInput: {
          value: "",
          cursorIndex: 0,
        },
      };
    case TerminalActions.SetCurrentInput:
      const actionValue = action.value;
      const currentValue = state.currentInput.value;
      const diff = actionValue.length - currentValue.length;

      return {
        ...state,
        currentInput: {
          value: action.value,
          cursorIndex: Math.max(0, state.currentInput.cursorIndex + diff),
        },
      };
    case TerminalActions.SetCursorIndex:
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          cursorIndex: Math.max(0, Math.min(state.currentInput.value.length, action.index)),
        },
      };
    case TerminalActions.UpdateCwd:
      return {
        ...state,
        cwd: action.cwd,
        env: {
          ...state.env,
          PWD: action.cwd,
        },
      };
    default:
      return state;
  }
}
