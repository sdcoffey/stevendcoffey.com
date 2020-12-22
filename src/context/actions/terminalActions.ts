import parse, { Command, CommandResult } from "shlep";

import { FilesystemNode, findOnPath, fs } from "../../filesystem";

import {
  GetState,
  Dispatch,
  State,
  ThunkAction,
  TerminalActions,
  AddInputAction,
  AddOutputAction,
  ClearInputsAction,
  ClearCurrentInputAction,
  SetCurrentInputAction,
  SetCursorIndexAction,
  UpdateCwdAction,
} from "../types";

export function clearCurrentInput(): ClearCurrentInputAction {
  return {
    type: TerminalActions.ClearCurrentInput,
  };
}

export function setCurrentInput(value: string): SetCurrentInputAction {
  return {
    type: TerminalActions.SetCurrentInput,
    value,
  };
}

export function setCursorIndex(index: number): SetCursorIndexAction {
  return {
    type: TerminalActions.SetCursorIndex,
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

export function updateCwd(cwd: string): UpdateCwdAction {
  return {
    type: TerminalActions.UpdateCwd,
    cwd,
  };
}

function clearInputs(): ClearInputsAction {
  return {
    type: TerminalActions.ClearInputs,
  };
}

function addInputAction(input: string, wd: string): AddInputAction {
  return {
    type: TerminalActions.AddInput,
    input: {
      type: "input",
      timestamp: Date.now(),
      wd,
      input,
    },
  };
}

function addOutputAction(output: string): AddOutputAction {
  return {
    type: TerminalActions.AddOutput,
    output: {
      type: "output",
      timestamp: Date.now(),
      output,
    },
  };
}

function addInput(input: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState): void => {
    const {
      terminal: { cwd },
    } = getState();

    dispatch(addInputAction(input, cwd));
  };
}

const evaluateCommand = (dispatch: Dispatch, state: State) => async (command: Command): Promise<CommandResult> => {
  const currentNode = fs().find(state.terminal.cwd);
  const {
    terminal: {
      env: { PATH },
    },
  } = state;

  const { executable } = command;
  const fullPath = findOnPath(PATH, executable);
  if (!fullPath) {
    return {
      exitCode: 1,
      output: `command not found: ${executable}`,
    };
  }

  const node = fs().find(fullPath as string) as FilesystemNode;

  if (node.executable) {
    let result = node.executable(command, dispatch, state);
    if (result instanceof Promise) {
      result = await result;
    }

    return result;
  }

  return {
    exitCode: 1,
    output: `permission denied: ${executable}`,
  };
};

function processCommand(input: string): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(addInput(input));
    if (input.trim().length > 0) {
      const result = parse(input.trim(), {
        evaluateCommand: evaluateCommand(dispatch, getState()),
      });
      if (result.output) {
        dispatch(addOutputAction(result.output));
      }
    }
  };
}
