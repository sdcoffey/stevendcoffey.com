import * as React from "react";

import { AppPropTypes } from "../../components/apps";

export type OSXAppType = React.ComponentClass<AppPropTypes>;

export interface App {
  appComponent: OSXAppType;
  dockIconSource: number;
  name: string;
}

export default class AppRegistry {
  static apps: App[] = [];

  static registerApp(app: App) {
    this.apps.push(app);
  }
}
