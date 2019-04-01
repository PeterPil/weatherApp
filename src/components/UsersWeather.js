import React, {Component} from 'react';
import {userToFirebaseActions} from '../actions';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from "react-router";
import WeatherCard from "./UsersWeatherCard";

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
        towns: state.firestore.ordered.listOfTown,
        isEmpty: state.firebase.auth.isEmpty

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTowns: town => dispatch(userToFirebaseActions.getTowns(town))
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect(() => [{collection: 'listOfTown'}])
)(UsersWeather);
