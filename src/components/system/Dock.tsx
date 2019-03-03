import * as React from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import AppRegistry, { App } from "../../registry/osx";
import DockIcon from "./DockIcon";
import { BlurView } from "../shared/BlurView";

import { State } from "../../redux/reducers";
import { Dispatch } from "../../redux/store";
import { openApp } from "../../redux/actions/osxActions";

import "../../style/Dock.scss";

interface DockProps {
  apps: App[];
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
    const openAppKeys = new Set(this.props.apps.map(app => app.name));

    return (
      <div className="Dock--wrapper" onMouseLeave={this.handleHoverOff}>
        <BlurView className={bvClasses} childrenClassName="Dock--iconsWrapper">
          {apps.map((app, i) => (
            <DockIcon
              key={i}
              open={openAppKeys.has(app.name)}
              appName={app.name}
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
      openApp(app);
    }
  };
}

const mapStateToProps = (state: State) => ({
  apps: state.osx.apps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openApp: (app: App) => {
    dispatch(openApp(app));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dock);
