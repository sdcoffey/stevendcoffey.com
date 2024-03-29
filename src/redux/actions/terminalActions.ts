import parse, { Command, CommandResult } from "shlep";

import { GetState, Dispatch, ThunkAction } from "../store";
import { State } from "../reducers";

import { FilesystemNode, RootNode } from "../../filesystem";
import { DEFAULT_DIRECTORY } from "../reducers/terminal";
import { which } from "../../bin";

// Behind the scenes sync actions
export const ADD_INPUT_PAIR = "ADD_INPUT_PAIR";
export const CLEAR_CURRENT_INPUT = "CLEAR_CURRENT_INPUT";
export const CLEAR_INPUTS = "CLEAR_INPUTS";
export const SET_CURRENT_INPUT = "SET_CURRENT_INPUT";
export const SET_CURSOR_INDEX = "SET_CURSOR_INDEX";
export const UPDATE_CWD = "UPDATE_CWD";

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
    type: CLEAR_CURRENT_INPUT,
  };
}

export function setCurrentInput(value: string): SetCurrentInputAction {
  return {
    type: SET_CURRENT_INPUT,
    value,
  };
}

export function setCursorIndex(index: number): SetCursorIndexAction {
  return {
    type: SET_CURSOR_INDEX,
    index,
  };
}

export function submit(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const {
      terminal: {
        currentInput: { value },
      },
    } = getState();

    dispatch(processCommand(value));
    dispatch(clearCurrentInput());
  };
}

function updateCwd(cwd: string): UpdateCwdAction {
  return {
    type: UPDATE_CWD,
    cwd,
  };
}

function clearInputs(): ClearInputsAction {
  return {
    type: CLEAR_INPUTS,
  };
}

function addInputPair(input: string, output: string | null): AddInputPairAction {
  const timestamp = Date.now();

  return {
    type: ADD_INPUT_PAIR,
    inputPair: {
      input,
      output,
      timestamp,
    },
  };
}

function resolveExecutable(executable: string, dispatch: Dispatch, state: State): CommandResult {
  const whichCommand = {
    executable: "which",
    arguments: [executable],
    opts: {},
  };

  return which(whichCommand, dispatch, state);
}

const evaluateCommand = (dispatch: Dispatch, state: State) => (command: Command): CommandResult => {
  const currentNode = RootNode.find(state.terminal.cwd);

  const { executable } = command;
  const result = resolveExecutable(executable, dispatch, state);
  if (result.exitCode) {
    return result;
  }

  const node = RootNode.find(result.output as string) as FilesystemNode;

  if (node.executable) {
    return node.executable(command, dispatch, state);
  }

  return {
    exitCode: 1,
    output: `permission denied: ${executable}`,
  };
};

function processCommand(input: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    if (input.trim().length > 0) {
      const result = parse(input, {
        evaluateCommand: evaluateCommand(dispatch, getState()),
      });
      if (result.output) {
        dispatch(addInputPair(input, result.output));
      }
    } else {
      dispatch(addInputPair(input, ""));
    }
  };
}
