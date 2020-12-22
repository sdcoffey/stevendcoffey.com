import React, { Component } from "react";
import { Provider } from "react-redux";

import Terminal from "./components/Terminal";
import { configureStore, ReduxStore } from "./context";

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
          <Terminal />
        </div>
      </Provider>
    );
  }
}

export default App;
