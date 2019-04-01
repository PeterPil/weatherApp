import React, {Component} from 'react';
import Header from './Header';
import WeatherSearch from './WeatherSearch';
import UsersWeather from './UsersWeather';
import {Redirect, Route, Switch} from 'react-router';
import SignIn from './SignIn';
import * as authActions from "../actions/authActions";
import connect from "react-redux/es/connect/connect";
import Registration from "./Registration";

class Weather extends Component {
    render() {
        return (
            <div className="wrap">
                <Header/>
                <Switch>
                    <Route path="/users-weather" component={UsersWeather}/>
                    <Route path="/sign-in" component={SignIn}/>
                    <Route exact path="/" component={WeatherSearch}/>
                    {/*{this.props.isEmpty &&*/}
                        {/*<Route path="/registration" component={Registration}/>*/}
                    {/*}*/}
                    <Route path="/registration" component={Registration}/>
                </Switch>

            </div>
        );
    }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    isEmpty: state.firebase.auth.isEmpty
  };
};


export default
  connect(
    mapStateToProps,
    null

)(Weather);
