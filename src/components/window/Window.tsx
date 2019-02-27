import * as React from "react";
import { Rnd, Props as RndProps } from "react-rnd";

import Toolbar from "./ToolBar";

interface OwnWindowProps {
  children?: React.ReactNode;
}

type WindowProps = OwnWindowProps | RndProps;

export default class Window extends React.Component<WindowProps> {
  static defaultProps = {
    minHeight: 50,
    minWidth: 100
  };
  key: string;

  constructor(props: WindowProps) {
    super(props);

    this.key = new Date().getTime().toString();
  }

  render() {
    const { children } = this.props;
    return (
      <Rnd
        style={styles.window}
        default={{ x: 0, y: 0, width: 320, height: 200 }}
        dragAxis="both"
        dragHandleClassName="Toolbar"
        enableResizing={{
          bottomLeft: true,
          bottomRight: true,
          topLeft: true,
          topRight: true
        }}
        {...this.props}
      >
        <React.Fragment>
          <Toolbar />
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
