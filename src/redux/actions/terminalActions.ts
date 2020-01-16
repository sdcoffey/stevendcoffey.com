import { GetState, Dispatch, ThunkAction } from "../store";
import { State } from "../reducers";

import { DEFAULT_DIRECTORY } from "../reducers/terminal";

// Behind the scenes sync actions
export const ADD_INPUT_PAIR = "ADD_INPUT_PAIR";
export const CLEAR_CURRENT_INPUT = "CLEAR_CURRENT_INPUT";
export const CLEAR_INPUTS = "CLEAR_INPUTS";
export const SET_CURRENT_INPUT = "SET_CURRENT_INPUT";
export const SET_CURSOR_INDEX = "SET_CURSOR_INDEX";
export const UPDATE_CWD = "UPDATE_CWD";

interface CommandMap {
  [command: string]: (
    dispatch: Dispatch,
    state: State,
    ...args: any[]
  ) => string;
}

const AVAILABLE_COMMANDS: CommandMap = {
  cd,
  clear,
  echo,
  pwd
};

interface AddInputPairAction {
  type: typeof ADD_INPUT_PAIR;
  inputPair: {
    input: string;
    output: string | null;
    timestamp: number;
  };
}

interface ClearInputsAction {
  type: typeof CLEAR_INPUTS;
}

interface ClearCurrentInputAction {
  type: typeof CLEAR_CURRENT_INPUT;
}

interface SetCurrentInputAction {
  type: typeof SET_CURRENT_INPUT;
  value: string;
}

interface SetCursorIndexAction {
  type: typeof SET_CURSOR_INDEX;
  index: number;
}

interface UpdateCwdAction {
  type: typeof UPDATE_CWD;
  cwd: string;
}

export type TerminalActionsType =
  | AddInputPairAction
  | ClearCurrentInputAction
  | ClearInputsAction
  | SetCurrentInputAction
  | SetCursorIndexAction
  | UpdateCwdAction;

export function clearCurrentInput(): ClearCurrentInputAction {
  return {
    type: CLEAR_CURRENT_INPUT
  };
}

export function setCurrentInput(value: string): SetCurrentInputAction {
  return {
    type: SET_CURRENT_INPUT,
    value
  };
}

export function setCursorIndex(index: number): SetCursorIndexAction {
  return {
    type: SET_CURSOR_INDEX,
    index
  };
}

export function submit(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const {
      terminal: {
        currentInput: { value }
      }
    } = getState();

    dispatch(processCommand(value));
    dispatch(clearCurrentInput());
  };
}

function updateCwd(cwd: string): UpdateCwdAction {
  return {
    type: UPDATE_CWD,
    cwd
  };
}

function clearInputs(): ClearInputsAction {
  return {
    type: CLEAR_INPUTS
  };
}

function addInputPair(
  input: string,
  output: string | null
): AddInputPairAction {
  const timestamp = Date.now();

  return {
    type: ADD_INPUT_PAIR,
    inputPair: {
      input,
      output,
      timestamp
    }
  };
}

function processCommand(input: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const cleaned = input.replace(/^\s+/, "").replace(/\s+$/, "");
    if (cleaned === "") {
      dispatch(addInputPair(cleaned, null));
      return;
    }

    const components = cleaned.split(" ");
    const exec = components[0];
    const args = components.slice(1, components.length);

    if (AVAILABLE_COMMANDS[exec] !== undefined) {
      const output = AVAILABLE_COMMANDS[exec](dispatch, getState(), ...args);
      dispatch(addInputPair(cleaned, output));
    } else {
      const output = `command not found: ${exec}`;
      dispatch(addInputPair(input, output));
    }
  };
}

function clear(dispatch: Dispatch, state: State, ...args: string[]): string {
  return dispatch(clearInputs());
}

function echo(dispatch: Dispatch, state: State, ...args: string[]): string {
  return args.join(" ");
}

function pwd(dispatch: Dispatch, state: State): string {
  const { cwd } = state.terminal;
  return cwd;
}

function cd(dispatch: Dispatch, state: State, newWd: string): string {
  const { cwd } = state.terminal;

  if (!newWd) {
    dispatch(updateCwd(DEFAULT_DIRECTORY));
    return "";
  } else if (cwd === ".") {
    dispatch(updateCwd(cwd));
    return "";
  }

  let components = newWd.split("/");

  return "";
}
