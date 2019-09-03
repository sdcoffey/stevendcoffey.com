import {
  ADD_INPUT_PAIR,
  CLEAR_INPUTS,
  CLEAR_CURRENT_INPUT,
  SET_CURRENT_INPUT,
  UPDATE_CWD,
  TerminalActionsType
} from "../actions/terminalActions";

export const DEFAULT_DIRECTORY = "/home/steve";

export interface InputPair {
  timestamp: number;
  input: string;
  output: string | null;
}

export interface TerminalState {
  cwd: string;
  currentInput: string;
  inputs: InputPair[];
}

const initialState: TerminalState = {
  cwd: DEFAULT_DIRECTORY,
  currentInput: "",
  inputs: []
};

export default function terminalReducer(
  state = initialState,
  action: TerminalActionsType
) {
  switch (action.type) {
    case ADD_INPUT_PAIR:
      return {
        ...state,
        inputs: [...state.inputs, action.inputPair]
      };
    case CLEAR_INPUTS:
      return {
        ...state,
        inputs: []
      };
    case CLEAR_CURRENT_INPUT:
      return {
        ...state,
        currentInput: ""
      };
    case SET_CURRENT_INPUT:
      return {
        ...state,
        currentInput: action.value
      };
    case UPDATE_CWD:
      return {
        ...state,
        cwd: action.cwd
      };
    default:
      return state;
  }
}
