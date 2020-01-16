import React, { Component } from "react";
import Media from "react-media";
import { Provider } from "react-redux";

import OSX from "./components/OSX";
import IOS from "./components/iOS";
import Terminal from "./components/Terminal"
import { configureStore, ReduxStore } from "./redux/store";

import "./style/App.scss";

interface AppProps {}
interface AppState {
  store: ReduxStore;
}

const store = configureStore();

class App extends Component<AppProps, AppState> {
  renderOS() {
    return (
      <Media query={{ maxWidth: 599 }}>
        {(matches: boolean) => (matches ? <IOS /> : <OSX />)}
      </Media>
    )
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Terminal />
        </div>
      </Provider>
    );
  }
}

export default App;
