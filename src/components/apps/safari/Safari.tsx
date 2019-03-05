import * as React from "react";
import Interweave from "interweave";
// @ts-ignore
import renderHTML from "react-render-html";

import AppRegistry from "../../../registry/osx";
import BaseApp, { BaseAppProps } from "../BaseApp";
import { BlurView } from "../../shared/BlurView";

import "./Safari.scss";

type SafariState = {
  url?: string;
  webContent?: string;
};

export default class Safari extends React.Component<BaseAppProps, SafariState> {
  iframe: HTMLIFrameElement | null = null;
  state = {
    url: "https://www.google.com",
    webContent: ""
  };

  componentDidMount() {
    const { url } = this.state;
    const corsUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    console.log(corsUrl);
    var x = new XMLHttpRequest();
    x.open("GET", corsUrl);
    x.onload = () => {
      const { iframe } = this;
      if (!!iframe && !!iframe.contentWindow) {
        const html = x.responseText.replace(
          new RegExp('(href|src)="/', "g"),
          '$1="' + `https://cors-anywhere.herokuapp.com/${url}` + "/"
        );

        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(html);
        iframe.contentWindow.document.close();
      }
    };

    // this.setState({ webContent });
    x.send();

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("message", this.handleMessageReceived, false);
  }

  handleMessageReceived = (message: MessageEvent) => {
    console.log(message);
  };

  render() {
    const { webContent, url } = this.state;

    return (
      <BaseApp {...this.props} windowProps={{ minHeight: 300, minWidth: 600 }}>
        <BlurView
          className="Safari--mainWindow"
          childrenClassName="Safari--fill"
        >
          <iframe
            ref={ref => (this.iframe = ref)}
            className="Safari--fill Safari--webFrame"
            // src={`https://cors-anywhere.herokuapp.com/${url}`}
          />
        </BlurView>
      </BaseApp>
    );
  }
}

AppRegistry.registerApp({
  appComponent: Safari,
  dockIconSource: require("./AppIcon.png"),
  name: "Safari"
});
