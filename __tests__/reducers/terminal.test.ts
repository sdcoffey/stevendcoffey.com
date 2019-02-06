import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  addInputPair,
  processCommand
} from "../../src/redux/actions/terminalActions";
import terminal from "../../src/redux/reducers/terminal";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe("terminal reducer", () => {
  describe("process command", () => {
    const store = mockStore({
      terminal: {
        cwd: "/",
        inputs: []
      }
    });

    it("strips whitespace and splits the input", () => {
      const command = " cd up ";

      jest.spyOn(Date, "now").mockImplementation(() => 1);

      store.dispatch(processCommand(command));
      expect(store.getActions()).toEqual([
        {
          type: "ADD_INPUT_PAIR",
          inputPair: {
            timestamp: 1,
            input: "cd up",
            output: ""
          }
        }
      ]);
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
