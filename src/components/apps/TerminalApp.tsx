import * as React from "react";

import BaseApp, { BaseAppProps } from "./BaseApp";
import Terminal from "../Terminal";

export default class TerminalApp extends React.Component<BaseAppProps> {
  render() {
    return (
      <BaseApp {...this.props}>
        <Terminal />
      </BaseApp>
    );
  }
}
