import * as React from "react";
import { connect } from "react-redux";
import { Props as RndProps } from "react-rnd";

import Window from "../window";
import { Dispatch } from "../../redux/store";
import { killApp } from "../../redux/actions/osxActions";

export interface BaseAppProps {
  windowProps?: RndProps;
  children?: React.ReactNode;
  pid: string;
  killApp?: typeof killApp;
}

const DEFAULT_MIN_WIDTH = 300;
const DEFAULT_MIN_HEIGHT = 300;

export class BaseApp extends React.Component<BaseAppProps> {
  render() {
    const { children, windowProps } = this.props;

    const windowPropsWithDefaults = {
      minHeight: DEFAULT_MIN_HEIGHT,
      minWidth: DEFAULT_MIN_WIDTH,
      ...windowProps
    };

    return (
      <Window
        toolbarProps={{
          onCloseRequest: this.handleCloseRequested
        }}
        windowProps={{ ...windowPropsWithDefaults }}
      >
        {children}
      </Window>
    );
  }

  handleCloseRequested = () => {
    const { killApp, pid } = this.props;

    if (killApp) {
      killApp(pid);
    }
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  killApp: (pid: string) => dispatch(killApp(pid))
});

export default connect(
  undefined,
  mapDispatchToProps
)(BaseApp);
