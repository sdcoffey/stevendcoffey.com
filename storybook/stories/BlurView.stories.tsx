import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Rnd, Props as RndProps } from "react-rnd";

import {
  BlurView,
  DraggableBlurView
} from "../../src/components/shared/BlurView";

import "./styles/BlurView.scss";

storiesOf("BlurView", module)
  .add("static", () => (
    <div className="BlurView--story">
      <BlurView className="BlurView--instance">
        <p>some text</p>
      </BlurView>
    </div>
  ))
  .add("animated", () => (
    <div className="BlurView--story">
      <BlurView className="BlurView--instance animated">
        <p>some text</p>
      </BlurView>
    </div>
  ))
  .add("draggable", () => (
    <div className="BlurView--story">
      <DraggableBlurView className="BlurView--instance">
        <p>some text</p>
      </DraggableBlurView>
    </div>
  ));
