import * as React from "react";
import { connect } from "react-redux";

import Dock from "./system/Dock";
import { BaseAppProps } from "./apps/BaseApp";
import { State } from "../redux/reducers";
import { Dispatch } from "../redux/store";
import { addApp } from "../redux/actions/osxActions";
import { ApplicationMap } from "../redux/reducers/osx";

import "../style/OSX.scss";

interface OSXProps {
  addApp?: typeof addApp;
  apps: ApplicationMap;
}

class OSX extends React.Component<OSXProps> {
  componentDidMount() {}

  render() {
    const { apps } = this.props;

    return (
      <div className="OSX">
        {Object.keys(apps).map(pid => {
          const { appType, appProps } = apps[pid];

          const computedProps = {
            key: pid,
            ...appProps
          };
          return React.createElement(appType, computedProps);
        })}
        <Dock />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({ apps: state.osx.apps });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addApp: (appType: React.ComponentClass<BaseAppProps>) => {
    dispatch(addApp(appType));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OSX);
