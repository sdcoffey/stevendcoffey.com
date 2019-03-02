import * as React from "react";

import { Apple } from "../shared/icons";
import { BlurView } from "../shared/BlurView";

import "../../style/SystemToolbar.scss";

export default function SystemToolbar() {
  return (
    <BlurView className="SystemToolbar">
      <Apple height={20} width={20} />
    </BlurView>
  );
}
