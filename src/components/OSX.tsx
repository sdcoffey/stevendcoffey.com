import * as React from "react";
import { connect } from "react-redux";

import { State } from "../redux/reducers";
import { Dispatch } from "../redux/store";
import { addWindow } from "../redux/actions/osxActions";
import { WindowMap } from "../redux/reducers/osx";
import TerminalApp from "./apps/TerminalApp";

import "../style/OSX.scss";

interface OSXProps {
  addWindow: typeof addWindow;
  windows: WindowMap;
}

class OSX extends React.Component<OSXProps> {
  componentDidMount() {
    const { addWindow } = this.props;
    addWindow("abc", TerminalApp);
  }

  render() {
    const { windows } = this.props;

    return (
      <div className="OSX">
        {Object.keys(windows).map(windowKey => {
          const { windowType } = windows[windowKey];

          const props = { key: windowKey };
          return React.createElement(windowType, props);
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({ windows: state.osx.windows });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addWindow: (windowKey: string, windowType: React.ComponentClass) =>
    dispatch(addWindow(windowKey, windowType))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OSX);
