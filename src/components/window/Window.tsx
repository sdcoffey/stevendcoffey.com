import * as React from "react";
import { Rnd, Props as RndProps } from "react-rnd";

import Toolbar, { ToolbarProps } from "./ToolBar";

interface WindowProps {
  children?: React.ReactNode;
  toolbarProps: ToolbarProps;
  windowProps: RndProps;
}

export default class Window extends React.Component<WindowProps> {
  render() {
    const { children, toolbarProps, windowProps } = this.props;
    return (
      <Rnd
        style={styles.window}
        default={{ x: 100, y: 100, width: 320, height: 200 }}
        dragAxis="both"
        dragHandleClassName="Toolbar"
        enableResizing={{
          bottomLeft: true,
          bottomRight: true,
          topLeft: true,
          topRight: true
        }}
        {...windowProps}
      >
        <React.Fragment>
          <Toolbar {...toolbarProps} />
          {children}
        </React.Fragment>
      </Rnd>
    );
  }
}

const styles = {
  topbar: {
    backgroundColor: "black",
    height: "20px",
    width: "100%"
  },
  window: {
    boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
    borderRadius: "5px",
    overflow: "hidden"
  }
};
