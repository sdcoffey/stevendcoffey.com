import * as React from "react";
import { connect } from "react-redux";

import "./apps";

import Dock from "./system/Dock";
import SystemToolbar from "./system/SystemToolbar";
import { State } from "../redux/reducers";
import { App } from "../registry/osx";

import "../style/OSX.scss";

interface OSXProps {
  apps: App[];
}

class OSX extends React.Component<OSXProps> {
  componentDidMount() {}

  render() {
    const { apps } = this.props;

    return (
      <div className="OSX">
        <div className="OSX--windowArea">
          {apps.reverse().map((app, i) => {
            const { appComponent, name } = app;

            const computedProps = {
              key: name,
              name,
              focused: i === 0
            };

            return React.createElement(appComponent, computedProps);
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
