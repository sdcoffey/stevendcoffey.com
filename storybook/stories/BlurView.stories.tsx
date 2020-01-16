import * as React from "react";
import { storiesOf } from "@storybook/react";

import {
  BlurView,
  DraggableBlurView
} from "../../src/components/shared/BlurView";

import "./styles/BlurView.scss";

storiesOf("BlurView", module)
  .add("static", () => (
    <div className="BlurView--story">
      <BlurView className="BlurView--instance" />
    </div>
  ))
  .add("animated", () => (
    <div className="BlurView--story">
      <BlurView className="BlurView--instance animated" />
    </div>
  ))
  .add("draggable", () => (
    <div className="BlurView--story">
      <DraggableBlurView className="BlurView--instance" />
    </div>
  ));
