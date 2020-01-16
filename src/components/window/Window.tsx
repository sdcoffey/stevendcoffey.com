import * as React from "react";
import { Rnd, Props as RndProps } from "react-rnd";

import Toolbar, { ToolbarProps } from "./ToolBar";

import "./Window.scss";

interface WindowProps {
  children?: React.ReactNode;
  toolbarProps: ToolbarProps;
  windowProps: RndProps;
  onClick?: () => void;
}

export default class Window extends React.Component<WindowProps> {
  static defaultProps = {
    focused: false
  };

  render() {
    const { children, toolbarProps, windowProps } = this.props;
    return (
      <Rnd
        className="Window"
        default={{ x: 100, y: 100, width: 320, height: 200 }}
        dragAxis="both"
        dragHandleClassName="Toolbar"
        bounds=".OSX--windowArea"
        enableResizing={{
          bottomLeft: true,
          bottomRight: true,
          topLeft: true,
          topRight: true
        }}
        {...windowProps}
      >
        <div className="Window--contentArea">
          <Toolbar {...toolbarProps} />
          <div className="Window--childrenArea">{children}</div>
        </div>
      </Rnd>
    );
  }
}
