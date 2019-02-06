import {
  ADD_INPUT_PAIR,
  UPDATE_CWD,
  TerminalActionsType
} from "../actions/terminalActions";

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
  cwd: "/home/steve",
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
    default:
      return initialState;
  }
}