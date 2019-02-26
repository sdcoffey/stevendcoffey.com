import * as React from "react";
import { Rnd } from "react-rnd";

import Toolbar from "./ToolBar";

interface WindowProps {
  children?: React.ReactNode;
  minWidth: number;
  minHeight: number;
}

export default function Window({ children, minHeight, minWidth }: WindowProps) {
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
      minHeight={minHeight}
      minWidth={minWidth}
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
