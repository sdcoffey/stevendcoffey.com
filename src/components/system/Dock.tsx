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
      <div
        className="Dock--wrapper"
        onMouseEnter={this.handleHoverOn}
        onMouseLeave={this.handleHoverOff}
      >
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
