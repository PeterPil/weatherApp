import React, {Component} from 'react';
import * as townInDatabase from '../actions/addListToFirebase';
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
        towns: state.firestore.ordered.listOfTown,
        isEmpty: state.firebase.auth.isEmpty

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTowns: town => dispatch(townInDatabase.getTowns(town))
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect(() => [{collection: 'listOfTown'}])
)(UsersWeather);
