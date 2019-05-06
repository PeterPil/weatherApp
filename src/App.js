import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import Weather from "./components/Weather";
import store from "./store/store";
import rrfProps from "./Firebase/rrfProps";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <Weather />
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
