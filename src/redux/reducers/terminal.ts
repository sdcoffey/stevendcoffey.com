import {
  ADD_INPUT_PAIR,
  CLEAR_INPUTS,
  CLEAR_CURRENT_INPUT,
  SET_CURRENT_INPUT,
  SET_CURSOR_INDEX,
  UPDATE_CWD,
  TerminalActionsType
} from "../actions/terminalActions";

export const DEFAULT_DIRECTORY = "/home/steve";

export interface InputPair {
  timestamp: number;
  input: string;
  output: string | null;
}

export interface CurrentInput {
  value: string;
  cursorIndex: number;
}

export interface TerminalState {
  cwd: string;
  currentInput: CurrentInput;
  inputs: InputPair[];
}

const initialState: TerminalState = {
  cwd: DEFAULT_DIRECTORY,
  currentInput: {
    value: "",
    cursorIndex: 0
  },
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
        currentInput: {
          value: "",
          cursorIndex: 0
        }
      };
    case SET_CURRENT_INPUT:
      const actionValue = action.value;
      const currentValue = state.currentInput.value;
      const diff = actionValue.length - currentValue.length;

      console.log({ diff, actionValue, currentValue });

      return {
        ...state,
        currentInput: {
          value: action.value,
          cursorIndex: Math.max(0, state.currentInput.cursorIndex + diff)
        }
      };
    case SET_CURSOR_INDEX:
      return {
        ...state,
        currentInput: {
          ...state.currentInput,
          cursorIndex: Math.max(
            0,
            Math.min(state.currentInput.value.length - 1, action.index)
          )
        }
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
