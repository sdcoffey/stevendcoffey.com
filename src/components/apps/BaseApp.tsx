import * as React from "react";
import { Props as RndProps } from "react-rnd";

import Window from "../window";

export interface BaseAppProps {
  windowProps?: RndProps;
  children?: React.ReactNode;
  pid: string;
}

const DEFAULT_MIN_WIDTH = 300;
const DEFAULT_MIN_HEIGHT = 300;

export default class BaseApp extends React.Component<BaseAppProps> {
  static defaultProps = {
    windowProps: {}
  };

  render() {
    const { children, windowProps } = this.props;

    const windowPropsWithDefaults = {
      minHeight: DEFAULT_MIN_HEIGHT,
      minWidth: DEFAULT_MIN_WIDTH,
      ...windowProps
    };

    return <Window {...windowPropsWithDefaults}>{children}</Window>;
  }
}
