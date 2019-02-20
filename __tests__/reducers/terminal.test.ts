import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  addInputPair,
  processCommand
} from "../../src/redux/actions/terminalActions";
import terminal from "../../src/redux/reducers/terminal";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const store = mockStore({
  terminal: {
    cwd: "/",
    inputs: []
  }
});

beforeEach(() => {
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

  describe("process command", () => {
    it("strips whitespace and splits the input", () => {
      const command = " cd up ";

      store.dispatch(processCommand(command));
      expectOutput("cd up", "");
    });
  });

  describe("echo", () => {
    it("echos an unquoted string", () => {
      const command = "echo hello";

      store.dispatch(processCommand(command));
      expectOutput(command, "hello");
    });

    it("echos a quoted string", () => {
      const command = "echo 'hello'";
      store.dispatch(processCommand(command));
      expectOutput(command, "hello");
    });
  });

  describe("add input pair", () => {
    it("adds an input pair to the state", () => {
      const action = addInputPair("test-input", "test-output");

      const newState = terminal(undefined, action);
      expect(newState.inputs).toContain(action.inputPair);
    });
  });
});
