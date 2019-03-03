import * as React from "react";

import { AppPropTypes } from "../../components/apps";

export interface App {
  appName: string;
  appComponent: React.ComponentClass<AppPropTypes>;
  dockIconSource: number;
}

export default class AppRegistry {
  static apps: App[] = [];

  static registerApp(app: App) {
    this.apps.push(app);
  }
}
