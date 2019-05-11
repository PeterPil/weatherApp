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

class Weather extends Component {
  componentWillMount() {
    this.props.setLoading();
  }
  componentDidMount() {
    this.props.resetLoading();
  }
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoadingFetch: state.loaderReducer.isLoadingFetch,
    isLoading: state.loaderReducer.isLoading,
    auth: state.firebase.auth,
    isEmpty: state.firebase.auth.isEmpty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: () => dispatch({type: "IS_LOADING"}),
    resetLoading: () => dispatch({type: "RESET_LOADING"})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: "users",
      where: ["id", "==", props.auth.uid || ""],
      storeAs: "usersTowns"
    }
  ])
)(Weather);
