import * as React from "react";

import { Apple } from "../shared/icons";

import "../../style/SystemToolbar.scss";

export default function SystemToolbar() {
  return (
    <div className="SystemToolbar">
      <Apple height={20} width={20} />
    </div>
  );
}
