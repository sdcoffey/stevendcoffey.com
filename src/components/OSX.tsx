import * as React from "react";
import { connect } from "react-redux";

import "./apps";

import Dock from "./system/Dock";
import SystemToolbar from "./system/SystemToolbar";
import { State } from "../redux/reducers";
import { ApplicationMap } from "../redux/reducers/osx";

import "../style/OSX.scss";

interface OSXProps {
  apps: ApplicationMap;
}

class OSX extends React.Component<OSXProps> {
  componentDidMount() {}

  render() {
    const { apps } = this.props;

    return (
      <div className="OSX">
        <div className="OSX--windowArea">
          {apps.reverse().map((app, i) => {
            const { appType, appProps, pid } = app;

            const computedProps = {
              key: pid,
              focused: i === 0,
              ...appProps
            };
            return React.createElement(appType, computedProps);
          })}
        </div>
        <SystemToolbar />
        <Dock />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({ apps: state.osx.apps });

export default connect(mapStateToProps)(OSX);
