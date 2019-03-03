import * as React from "react";

import AppRegistry from "../../../registry/osx/AppRegistry";
import BaseApp, { BaseAppProps } from "../BaseApp";
import Terminal from "../../Terminal";

export default class Iterm extends React.Component<BaseAppProps> {
  render() {
    return (
      <BaseApp {...this.props} windowProps={{ minHeight: 300, minWidth: 600 }}>
        <Terminal />
      </BaseApp>
    );
  }
}

AppRegistry.registerApp({
  appComponent: Iterm,
  dockIconSource: require("./AppIcon.png"),
  name: "iTerm"
});
