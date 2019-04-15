import React, {Component} from 'react';
import Header from './Header';
import WeatherSearch from './WeatherSearch';
import UsersWeather from './UsersWeather';
import {Route, Switch} from 'react-router';
import SignIn from './SignIn';
import connect from "react-redux/es/connect/connect";
import Registration from "./Registration";
import WeatherCards from "./WeatherCards";

class Weather extends Component {
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
        isEmpty: state.firebase.auth.isEmpty
    };
};


export default connect(
    mapStateToProps,
    null
)(Weather);
