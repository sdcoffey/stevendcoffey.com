import { closeApp, requestFocus } from "../../src/redux/actions/osxActions";
import BaseApp from "../../src/components/apps/BaseApp";
import osx, { OSXState } from "../../src/redux/reducers/osx";
import { App } from "../../src/registry/osx/AppRegistry";

function generateInitialState(appCount: number): OSXState {
  const apps: App[] = [];

  for (let i = 0; i < appCount; i++) {
    apps.push({
      appComponent: BaseApp,
      name: i.toString(),
      dockIconSource: 0
    });
  }

  return { apps };
}

describe("osx reducer", () => {
  describe("close app", () => {
    const initialState = generateInitialState(3);

    it("should remove the app from the array", () => {
      const action = closeApp("1");

      const newState = osx(initialState, action);

      expect(newState.apps.length).toEqual(2);
      expect(newState.apps[0].name).toEqual("0");
      expect(newState.apps[1].name).toEqual("2");
    });
  });

  describe("request focus", () => {
    const initialState = generateInitialState(3);

    it("should bring requested app to the front", () => {
      const action = requestFocus("2");
      const newState = osx(initialState, action);

      expect(newState.apps.length).toEqual(3);
      expect(newState.apps[0].name).toEqual("2");
      expect(newState.apps[1].name).toEqual("0");
      expect(newState.apps[2].name).toEqual("1");
    });
  });
});
