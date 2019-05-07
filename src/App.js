import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import Weather from "./components/Weather";
import store from "./store/store";
import rrfProps from "./Firebase/rrfProps";
import { toast, ToastContainer } from "react-toastify";
import WeatherHOCLoader from "./components/WeatherHOCLoader";
toast.configure();

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: false });
    const elem = document.getElementById("root");
    elem.classList.remove("loader");
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <WeatherHOCLoader />
            <ToastContainer
              className="toaster"
              position="top-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
