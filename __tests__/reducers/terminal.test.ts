import { processCommand } from "../../src/redux/actions/terminalActions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe("terminal reducer", () => {
  describe("process command", () => {
    const store = mockStore({
      terminal: {
        cwd: "/",
        inputPairs: []
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
});
