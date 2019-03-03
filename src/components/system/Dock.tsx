import * as React from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import AppRegistry, { App } from "../../registry/osx/AppRegistry";
import DockIcon from "./DockIcon";
import { BlurView } from "../shared/BlurView";
import { openApp } from "../../redux/actions/osxActions";

import "../../style/Dock.scss";

interface DockProps {
  openApp?: typeof openApp;
}

interface DockState {
  hidden: boolean;
}

class Dock extends React.Component<DockProps, DockState> {
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

    const { apps } = AppRegistry;

    return (
      <div className="Dock--wrapper" onMouseLeave={this.handleHoverOff}>
        <BlurView className={bvClasses} childrenClassName="Dock--iconsWrapper">
          {apps.map((app, i) => (
            <DockIcon
              key={i}
              appName={app.appName}
              source={app.dockIconSource}
              onClick={this.handleIconClicked(app)}
            />
          ))}
        </BlurView>
        <div className="Dock--hoverRegion" onMouseEnter={this.handleHoverOn} />
      </div>
    );
  }

  handleHoverOn = () => {
    this.setState({ hidden: false });
  };

  handleHoverOff = () => {
    this.setState({ hidden: true });
  };

  handleIconClicked = (app: App) => () => {
    const { openApp } = this.props;
    if (openApp) {
      openApp(app.appComponent);
    }
  };
}

const connector = connect(
  undefined,
  { openApp }
);

export default connector(Dock);
