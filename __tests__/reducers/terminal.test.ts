import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  clearCurrentInput,
  setCurrentInput,
  setCursorIndex,
  submit
} from "../../src/redux/actions/terminalActions";
import terminal from "../../src/redux/reducers/terminal";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let currentInput = {
  value: "",
  cursorIndex: 0
};

let initialState = undefined;
let store = mockStore({});

beforeEach(() => {
  initialState = {
    currentInput,
    cwd: "/",
    inputs: []
  };

  store.clearActions();
});

function expectOutput(input: string, output: string) {
  expect(store.getActions()).toContainEqual({
    type: "ADD_INPUT_PAIR",
    inputPair: {
      timestamp: 1,
      input,
      output
    }
  });
}

describe("terminal reducer", () => {
  jest.spyOn(Date, "now").mockImplementation(() => 1);

  describe("clearCurrentInput", () => {
    beforeAll(() => {
      currentInput = {
        value: "abcd",
        cursorIndex: 3
      };
    });

    it("clears current input", () => {
      const newState = terminal(initialState, clearCurrentInput());

      const {
        currentInput: { value, cursorIndex }
      } = newState;

      expect(value).toEqual("");
      expect(cursorIndex).toEqual(0);
    });
  });

  describe("setCurrentInput", () => {
    it.only("sets the current input value and increments the cursorIndex", () => {
      const newState = terminal(initialState, setCurrentInput("a"));

      const {
        currentInput: { value, cursorIndex }
      } = newState;

      console.log({ newState });

      expect(value).toEqual("a");
      expect(cursorIndex).toEqual(1);
    });

    describe("when cursor is at beginning and decrementing", () => {
      beforeAll(() => {
        currentInput = {
          value: "abcd",
          cursorIndex: 0
        };
      });

      it("does not let the cursor go below 0", () => {
        const newState = terminal(initialState, setCurrentInput("abc"));
        const {
          currentInput: { value, cursorIndex }
        } = newState;

        expect(value).toEqual("abc");
        expect(cursorIndex).toEqual(0);
      });
    });
  });

  // describe("process command", () => {
  //   it("strips whitespace and splits the input", () => {
  //     const command = " cd up ";
  //
  //     store.dispatch(processCommand(command));
  //     expectOutput("cd up", "");
  //   });
  // });
  //
  // describe("echo", () => {
  //   it("echos an unquoted string", () => {
  //     const command = "echo hello";
  //
  //     store.dispatch(processCommand(command));
  //     expectOutput(command, "hello");
  //   });
  //
  //   it("echos a quoted string", () => {
  //     const command = "echo 'hello'";
  //     store.dispatch(processCommand(command));
  //     expectOutput(command, "'hello'");
  //   });
  // });
  //
  // describe("add input pair", () => {
  //   it("adds an input pair to the state", () => {
  //     const action = addInputPair("test-input", "test-output");
  //
  //     const newState = terminal(undefined, action);
  //     expect(newState.inputs).toContain(action.inputPair);
  //   });
  // });
});
