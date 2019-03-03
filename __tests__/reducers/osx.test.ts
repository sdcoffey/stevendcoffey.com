import {
  openApp,
  closeApp,
  requestFocus
} from "../../src/redux/actions/osxActions";
import BaseApp from "../../src/components/apps/BaseApp";
import osx, { OSXState } from "../../src/redux/reducers/osx";

function generateInitialState(appCount: number): OSXState {
  const apps = Array(appCount)
    .fill(null)
    .map((_, i) => ({
      appType: BaseApp,
      appProps: {
        pid: i.toString()
      },
      pid: i.toString()
    }));

  return { apps };
}

describe("osx reducer", () => {
  describe("open app", () => {
    it("should add the app to the store", () => {
      const actions = [openApp(BaseApp), openApp(BaseApp)];

      let state;
      actions.forEach(action => {
        state = osx(state, action);
      });

      expect(state.apps.length).toEqual(2);
      expect(state.apps[0].pid).toEqual(actions[0].pid);
      expect(state.apps[1].pid).toEqual(actions[1].pid);
      expect(state.apps[0].appType).toEqual(actions[0].app.appType);
      expect(state.apps[1].appType).toEqual(actions[1].app.appType);
    });
  });

  describe("close app", () => {
    const initialState = generateInitialState(3);

    it("should remove the app from the array", () => {
      const action = closeApp("1");

      const newState = osx(initialState, action);

      expect(newState.apps.length).toEqual(2);
      expect(newState.apps[0].pid).toEqual("0");
      expect(newState.apps[1].pid).toEqual("2");
    });
  });

  describe("request focus", () => {
    const initialState = generateInitialState(3);

    it("should bring requested app to the front", () => {
      const action = requestFocus("2");
      const newState = osx(initialState, action);

      expect(newState.apps.length).toEqual(3);
      expect(newState.apps[0].pid).toEqual("2");
      expect(newState.apps[1].pid).toEqual("0");
      expect(newState.apps[2].pid).toEqual("1");
    });
  });
});
