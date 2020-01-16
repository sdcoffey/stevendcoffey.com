import * as React from "react";
import { connect } from "react-redux";
import { Props as RndProps } from "react-rnd";

import Window from "../window";
import { Dispatch } from "../../redux/store";
import { closeApp, requestFocus } from "../../redux/actions/osxActions";

export interface BaseAppProps {
  windowProps?: RndProps;
  children?: React.ReactNode;
  closeApp?: typeof closeApp;
  name: string;
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
    const { closeApp, name } = this.props;

    if (closeApp) {
      closeApp(name);
    }
  };

  handleClick = () => {
    const { requestFocus, name } = this.props;

    if (requestFocus) {
      requestFocus(name);
    }
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeApp: (name: string) => dispatch(closeApp(name)),
  requestFocus: (name: string) => dispatch(requestFocus(name))
});

export default connect(
  undefined,
  mapDispatchToProps
)(BaseApp);
