import * as React from "react";

import BaseApp, { BaseAppProps } from "./BaseApp";

export default class Safari extends React.Component<BaseAppProps> {
  render() {
    return (
      <BaseApp {...this.props} windowProps={{ minHeight: 300, minWidth: 600 }}>
        <div />
      </BaseApp>
    );
  }
}
