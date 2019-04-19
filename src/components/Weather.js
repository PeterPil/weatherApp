import React, {Component} from 'react';
import Header from './Header';
import WeatherSearch from './WeatherSearch';
import UsersWeather from './UsersWeather';
import {Route, Switch} from 'react-router';
import SignIn from './SignIn';
import connect from "react-redux/es/connect/connect";
import Registration from "./Registration";
import {authActions} from "../actions";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

class Weather extends Component {
    componentWillMount() {
        // this.props.isSignIn();
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
        isSignIn: () => dispatch(authActions.checkLogIn())
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect(props =>
        [{
            collection: 'users',
            where: ['email', '==', props.auth.email || ''],
            storeAs: 'usersTown'
        }]
    ),
)(Weather);
