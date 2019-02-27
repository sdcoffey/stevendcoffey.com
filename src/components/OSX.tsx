import * as React from "react";
import { connect } from "react-redux";

import { State } from "../redux/reducers";
import { Dispatch } from "../redux/store";
import { addWindow } from "../redux/actions/osxActions";
import { WindowMap } from "../redux/reducers/osx";

import "../style/OSX.scss";

interface OSXProps {
  windows: WindowMap;
}

class OSX extends React.Component<OSXProps> {
  render() {
    const { windows } = this.props;

    return (
      <div className="OSX">
        {Object.keys(windows).map(windowKey => {
          const { type, props } = windows[windowKey];

          props.key = windowKey;
          return React.createElement(type, props);
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({ windows: state.osx.windows });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addWindow: (windowKey: string) => dispatch(addWindow(windowKey))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OSX);
