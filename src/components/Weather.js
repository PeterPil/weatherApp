import React, { Component } from "react";
import Header from "./Header";
import WeatherSearch from "./WeatherSearch";
import UsersWeather from "./UsersWeather";
import { Route, Switch, withRouter } from "react-router-dom";
import SignIn from "./SignIn";
import connect from "react-redux/es/connect/connect";
import Registration from "./Registration";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

class Weather extends Component {
  render() {
    return (
      <div className="wrap">
        <Header />
        <Switch>
          <PrivateRoute
            path="/users-weather"
            authed={this.props.isEmpty}
            redirect="/"
            component={UsersWeather}
          />
          <PrivateRoute
            path="/sign-in"
            authed={!this.props.isEmpty}
            redirect="/users-weather"
            component={SignIn}
          />
          <PrivateRoute
            path="/registration"
            authed={!this.props.isEmpty}
            redirect="/"
            component={Registration}
          />
          <Route path="/" component={WeatherSearch} />
        </Switch>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    isEmpty: state.firebase.auth.isEmpty
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null
  ),
  firestoreConnect(props => [
    {
      collection: "users",
      where: ["id", "==", props.auth.uid || ""],
      storeAs: "usersTowns"
    }
  ])
)(Weather);
