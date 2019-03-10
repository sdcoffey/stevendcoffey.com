import React, { Component } from "react";
import { Provider } from "react-redux";

import OSX from "./components/OSX";
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
          <OSX />
        </div>
      </Provider>
    );
  }
}

export default App;
