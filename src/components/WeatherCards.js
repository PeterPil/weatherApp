import React, {Component} from 'react';
import {userToFirebaseActions} from '../actions';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from "react-router";
import WeatherCard from "./WeatherCard";

class UsersWeather extends Component {
    render() {
        if (this.props.isEmpty) {
            return <Redirect to='/'/>
        }
        return (
            <section>
                <div>UsersWeather</div>
                {this.props.towns ? this.props.towns.map((town) => <WeatherCard town={town}/>): null}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
)(UsersWeather);
