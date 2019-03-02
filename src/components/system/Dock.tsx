import * as React from "react";
import classNames from "classnames";

import { BlurView } from "../shared/BlurView";
import "../../style/Dock.scss";

interface DockProps {}
interface DockState {
  hidden: boolean;
}

export default class Dock extends React.Component<DockProps, DockState> {
  state = {
    hidden: true
  };

  render() {
    const { hidden } = this.state;

    const bvClasses = classNames([
      "Dock",
      {
        hidden,
        shown: !hidden
      }
    ]);

    return (
      <div className="Dock--wrapper" onMouseLeave={this.handleHoverOff}>
        <div className="Dock--hoverRegion" onMouseEnter={this.handleHoverOn} />
        <BlurView className={bvClasses} />
      </div>
    );
  }

  handleHoverOn = () => {
    this.setState({ hidden: false });
  };

  handleHoverOff = () => {
    this.setState({ hidden: true });
  };
}
