import * as React from "react";
import classNames from "classnames";

import { BlurView } from "../shared/BlurView";

import "../../style/DockIcon.scss";

interface DockIconProps {
  appName: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  source: number;
}

interface DockIconState {
  selected: boolean;
}

export default class DockIcon extends React.Component<
  DockIconProps,
  DockIconState
> {
  state = {
    selected: false
  };

  render() {
    const { appName, source } = this.props;
    const { selected } = this.state;

    const classes = classNames("DockIcon", { "DockIcon--selected": selected });

    return (
      <div className="DockIcon--wrapper">
        <div onClick={this.handleClick} className={classes}>
          <img
            className="DockIcon--image"
            src={String(source)}
            alt="DockIcon"
          />
        </div>
        <BlurView className="DockIcon--tooltip">{appName}</BlurView>
      </div>
    );
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { onClick } = this.props;
    if (onClick) {
      this.setState({ selected: true });

      onClick(event);
    }
  };
}
