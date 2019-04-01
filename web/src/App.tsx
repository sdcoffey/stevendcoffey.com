import React, { Component } from "react";
import Media from "react-media";
import { Provider } from "react-redux";

import OSX from "./components/OSX";
import IOS from "./components/iOS";
import { configureStore, ReduxStore } from "./redux/store";

import "./style/App.scss";

interface AppProps {}
interface AppState {
  store: ReduxStore;
}

const store = configureStore();

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Media query={{ maxWidth: 599 }}>
            {(matches: boolean) => (matches ? <IOS /> : <OSX />)}
          </Media>
        </div>
      </Provider>
    );
  }
}

export default App;
