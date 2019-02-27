import * as React from "react";

import Window from "../window";
import Terminal from "../Terminal";

export default class TerminalApp extends React.Component<{}> {
  render() {
    return (
      <Window minWidth={300} minHeight={200}>
        <Terminal />
      </Window>
    );
  }
}
