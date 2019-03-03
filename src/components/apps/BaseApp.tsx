import * as React from "react";
import { connect } from "react-redux";
import { Props as RndProps } from "react-rnd";

import Window from "../window";
import { Dispatch } from "../../redux/store";
import { closeApp, requestFocus } from "../../redux/actions/osxActions";

export interface BaseAppProps {
  windowProps?: RndProps;
  children?: React.ReactNode;
  pid: string;
  closeApp?: typeof closeApp;
  requestFocus?: typeof requestFocus;
}

const DEFAULT_MIN_WIDTH = 300;
const DEFAULT_MIN_HEIGHT = 300;

export class BaseApp extends React.Component<BaseAppProps> {
  render() {
    const { children, windowProps } = this.props;

    const windowPropsWithDefaults = {
      minHeight: DEFAULT_MIN_HEIGHT,
      minWidth: DEFAULT_MIN_WIDTH,
      onClick: this.handleClick,
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
    const { closeApp, pid } = this.props;

    if (closeApp) {
      closeApp(pid);
    }
  };

  handleClick = () => {
    const { requestFocus, pid } = this.props;

    if (requestFocus) {
      requestFocus(pid);
    }
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeApp: (pid: string) => dispatch(closeApp(pid)),
  requestFocus: (pid: string) => dispatch(requestFocus(pid))
});

export default connect(
  undefined,
  mapDispatchToProps
)(BaseApp);
