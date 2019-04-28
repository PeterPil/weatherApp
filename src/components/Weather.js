import React, {Component} from "react";
import Header from "./Header";
import WeatherSearch from "./WeatherSearch";
import UsersWeather from "./UsersWeather";
import {Route, Switch} from "react-router";
import SignIn from "./SignIn";
import connect from "react-redux/es/connect/connect";
import Registration from "./Registration";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {weatherActions, authActions} from "../actions";

class Weather extends Component {
  componentDidMount() {
    
    const query = new URLSearchParams(this.props.location.search);
    const name = this.props.location.pathname.split('/');
    const day = query.get('day');
    this.props.fetchWeather(name[2]);
   
    
  }
  
  
  
  render() {
    return (
      <div className="wrap">
        <Header/>
        <Switch>
          <Route path="/users-weather" component={UsersWeather}/>
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/weather" component={WeatherSearch}/>
          <Route path="/registration" component={Registration}/>
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
    authState: () => dispatch(authActions.authState())
  };
};

export default compose(
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
