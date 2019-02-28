import * as React from "react";

import "../../style/Toolbar.scss";

export interface ToolbarProps {
  title?: string;
  onCloseRequest?: () => void;
  onHideRequest?: () => void;
  onFullScreenRequest?: () => void;
}

export default function Toolbar(props: ToolbarProps) {
  const { title, onCloseRequest, onHideRequest, onFullScreenRequest } = props;

  return (
    <div className="Toolbar">
      <div className="Toolbar--button" onClick={handleClick(onCloseRequest)} />
      <div className="Toolbar--button" onClick={handleClick(onHideRequest)} />
      <div
        className="Toolbar--button"
        onClick={handleClick(onFullScreenRequest)}
      />
    </div>
  );
}

const handleClick = (handler?: () => void) => () => {
  if (handler) {
    handler();
  }
};
