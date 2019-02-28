import * as React from "react";

import "../../style/Dock.scss";

interface DockProps {}

export default class Dock extends React.Component<DockProps> {
  render() {
    return (
      <div className="Dock--wrapper">
        <div className="Dock" />
      </div>
    );
  }
}
