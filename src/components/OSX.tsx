import * as React from "react";

import "../style/OSX.scss";

import { TerminalApp } from "./apps";

interface OSXProps {}

export default function OSX(props: OSXProps) {
  return (
    <div className="OSX">
      <TerminalApp />
    </div>
  );
}
