import React, {Component} from "react";
import Header from "./Header";
import WeatherSearch from "./WeatherSearch";
import UsersWeather from "./UsersWeather";
import {Route, Switch, withRouter} from "react-router-dom";
import SignIn from "./SignIn";
import connect from "react-redux/es/connect/connect";
import Registration from "./Registration";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {weatherActions} from "../actions";

class Weather extends Component {
  
  render() {
    return (
      <div className="wrap">
        <Header/>
        <Switch>
          <Route path="/users-weather" component={UsersWeather}/>
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/registration" component={Registration}/>
          <Route path="/" component={WeatherSearch}/>
        </Switch>
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

const mapDispatchToProps = dispatch => {
  return {
    fetchWeather: search => dispatch(weatherActions.fetchWeather(search)),
    setWeatherTypeReducer: weatherType => dispatch(weatherActions.setWeatherType(weatherType)),
  };
};

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
  ]),
)(Weather);
