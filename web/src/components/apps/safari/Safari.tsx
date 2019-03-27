import * as React from "react";
// @ts-ignore
import renderHTML from "react-render-html";

import AppRegistry from "../../../registry/osx";
import BaseApp, { BaseAppProps } from "../BaseApp";
import { BlurView } from "../../shared/BlurView";

import "./Safari.scss";

type SafariState = {
  url?: string;
};

export default class Safari extends React.Component<BaseAppProps, SafariState> {
  iframe: HTMLIFrameElement | null = null;
  state = {
    url: "https://www.apple.com"
  };

  bindEvents() {
    window.addEventListener("message", this.handleMessageReceived, false);
  }

  handleMessageReceived = (message: MessageEvent) => {
    console.log(message);
  };

  render() {
    const { url } = this.state;

    return (
      <BaseApp {...this.props} windowProps={{ minHeight: 300, minWidth: 600 }}>
        <BlurView
          className="Safari--mainWindow"
          childrenClassName="Safari--fill"
        >
          <iframe
            is="x-frame-bypass"
            className="Safari--fill Safari--webFrame"
            src={url}
            width="100%"
            height="100%"
          />
        </BlurView>
      </BaseApp>
    );
  }
}

// AppRegistry.registerApp({
//   appComponent: Safari,
//   dockIconSource: require("./AppIcon.png"),
//   name: "Safari"
// });
