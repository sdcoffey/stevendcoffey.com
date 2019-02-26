import * as React from "react";
import { Rnd, Props as RndProps } from "react-rnd";

import Toolbar from "./ToolBar";

interface WindowProps {
  children?: React.ReactNode;
}

export default function Window(props: WindowProps | RndProps) {
  const { children } = props;
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
      {...props}
    >
      <React.Fragment>
        <Toolbar />
        {children}
      </React.Fragment>
    </Rnd>
  );
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

Window.defaultProps = {
  minHeight: 50,
  minWidth: 100
};
