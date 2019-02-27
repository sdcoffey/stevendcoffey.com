import {
  ADD_INPUT_PAIR,
  CLEAR_INPUTS,
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
  inputs: InputPair[];
}

const initialState: TerminalState = {
  cwd: DEFAULT_DIRECTORY,
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
    case UPDATE_CWD:
      return {
        ...state,
        cwd: action.cwd
      };
    case CLEAR_INPUTS:
      return {
        ...state,
        inputs: []
      };
    default:
      return initialState;
  }
}
