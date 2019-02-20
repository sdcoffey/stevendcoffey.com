import { GetState, Dispatch, ThunkAction } from "../store";
import { State } from "../reducers";

import { DEFAULT_DIRECTORY } from "../reducers/terminal";

// Behind the scenes sync actions
export const UPDATE_CWD = "UPDATE_CWD";
export const ADD_INPUT_PAIR = "ADD_INPUT_PAIR";

interface CommandMap {
  [command: string]: (
    dispatch: Dispatch,
    state: State,
    ...args: any[]
  ) => string;
}

const AVAILABLE_COMMANDS: CommandMap = {
  cd,
  echo,
  pwd
};

interface UpdateCwdAction {
  type: typeof UPDATE_CWD;
  cwd: string;
}

interface AddInputPairAction {
  type: typeof ADD_INPUT_PAIR;
  inputPair: {
    input: string;
    output: string | null;
    timestamp: number;
  };
}

export type TerminalActionsType = UpdateCwdAction | AddInputPairAction;

function updateCwd(cwd: string): UpdateCwdAction {
  return {
    type: UPDATE_CWD,
    cwd
  };
}

export function addInputPair(
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

export function processCommand(input: string): ThunkAction {
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
