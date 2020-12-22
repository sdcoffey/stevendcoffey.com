import { Store } from "redux";

export interface InputPair {
  output: string | null;
}

export interface Input {
  type: "input";
  timestamp: number;
  wd: string;
  input: string;
}

export interface Output {
  type: "output";
  timestamp: number;
  output: string;
}

export type Row = Input | Output;

export interface CurrentInput {
  value: string;
  cursorIndex: number;
}

export interface TerminalState {
  cwd: string;
  env: Record<string, string>;
  currentInput: CurrentInput;
  rows: Row[];
}

export interface State {
  terminal: TerminalState;
}

// Actions

export enum TerminalActions {
  AddInput = "ADD_INPUT",
  AddOutput = "ADD_OUTPUT",
  ClearCurrentInput = "CLEAR_CURRENT_INPUT",
  ClearInputs = "CLEAR_INPUTS",
  SetCurrentInput = "SET_CURRENT_INPUT",
  SetCursorIndex = "SET_CURSOR_INDEX",
  UpdateCwd = "UPDATE_CWD",
}

export interface AddInputAction {
  type: TerminalActions.AddInput;
  input: Input;
}

export interface AddOutputAction {
  type: TerminalActions.AddOutput;
  output: Output;
}

export interface ClearInputsAction {
  type: typeof TerminalActions.ClearInputs;
}

export interface ClearCurrentInputAction {
  type: typeof TerminalActions.ClearCurrentInput;
}

export interface SetCurrentInputAction {
  type: typeof TerminalActions.SetCurrentInput;
  value: string;
}

export interface SetCursorIndexAction {
  type: typeof TerminalActions.SetCursorIndex;
  index: number;
}

export interface UpdateCwdAction {
  type: typeof TerminalActions.UpdateCwd;
  cwd: string;
}

export type TerminalActionsType =
  | AddInputAction
  | AddOutputAction
  | ClearCurrentInputAction
  | ClearInputsAction
  | SetCurrentInputAction
  | SetCursorIndexAction
  | UpdateCwdAction;

// Store
export type ReduxStore = Store<State, TerminalActionsType>;
export type GetState = () => State;
export type PromiseAction = Promise<TerminalActionsType>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => void;
export type Dispatch = (action: TerminalActionsType | ThunkAction | PromiseAction | Array<TerminalActionsType>) => any;
