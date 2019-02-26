import * as React from "react";

import "../style/OSX.scss";

import Window from "./window/Window";

interface OSXProps {}

export default function OSX(props: OSXProps) {
  return (
    <div className="OSX">
      <Window />
    </div>
  );
}
