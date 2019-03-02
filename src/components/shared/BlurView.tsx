import * as React from "react";
import classNames from "classnames";
import { Rnd, Props as RndProps } from "react-rnd";

import "../../style/BlurView.scss";

interface OwnBlurViewProps {
  children?: React.ReactNode;
}

type BlurViewProps = OwnBlurViewProps & React.HTMLAttributes<HTMLDivElement>;
type DraggableData = {
  node: HTMLElement;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
};

export function BlurView(props: BlurViewProps) {
  const { children, className } = props;

  return (
    <div className={classNames("BlurView", className)}>
      <div className="BlurView--children">{children}</div>
    </div>
  );
}

type DraggableBlurViewProps = BlurViewProps & RndProps;
interface DraggableBlurViewState {
  x: number;
  y: number;
}

export class DraggableBlurView extends React.Component<
  DraggableBlurViewProps,
  DraggableBlurViewState
> {
  constructor(props: DraggableBlurViewProps) {
    super(props);

    if (!!props.default) {
      this.state = {
        x: props.default.x,
        y: props.default.y
      };
    } else {
      this.state = {
        x: 0,
        y: 0
      };
    }
  }

  render() {
    const { x, y } = this.state;
    let style = {};
    if (!!x && !!y) {
      let cx = x - 8;
      let cy = y - 8;
      style = {
        backgroundPosition: `${-cx}px ${-cy}px`
      };
    }
    console.log(style);

    return (
      <Rnd
        onDrag={this.handleDrag}
        default={{ x: 0, y: 0, width: 100, height: 100 }}
        className="BlurView"
        style={style}
      />
    );
  }

  handleDrag = (_: any, { x, y }: DraggableData) => {
    console.log(x, y);
    this.setState({ x, y });
  };
}
