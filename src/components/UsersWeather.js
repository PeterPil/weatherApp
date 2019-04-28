import React, {Component} from 'react';
import {userToFirebaseActions} from '../actions';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import UsersCard from "./UsersCard";

import AliceCarousel from 'react-alice-carousel'
import {Redirect, Route, Switch} from "react-router";
import AddTownCard from "./AddTownCard";
import WeatherCardsCarousel from "./WeatherCardsCarousel";


const responsive = {
    0: {
        items: 1
    },
    1200: {
        items: 5
    },
    992: {
        items: 4
    },
    768: {
        items: 3
    },
    470: {
        items: 2
    }
};


class UsersWeather extends Component {

    state = {
        townName: 'some'
    }

    setUrlPath = (name) => {
        this.setState({
            townName: name
        })
    }

    renderCards() {
        return (this.props.usersTown.town
            ? this.props.usersTown.town.map(town =>
                <UsersCard town={town}
                           key={town.id}
                           usersTowns={this.props.usersTown.town}
                           setUrlPath={this.setUrlPath}
                           path={this.props.match.path}
                />)
            : null)
    }

    render() {
        if (this.props.isEmpty) {
            return <Redirect to='/'/>
        }
        return (
            <section className="users-section">
                <div className="container">
                    <div className="users-weather">
                        <h1 className="users-weather__title">UsersWeather</h1>
                        <div className="users-weather__items">
                            <Switch>
                                <Route exact path={`${this.props.match.path}`} render={() => {
                                return (<AliceCarousel
                                    mouseDragEnabled
                                    responsive={responsive}
                                    infinite={false}
                                    items={
                                        [
                                            (<AddTownCard usersTowns={this.props.usersTown.town}/>),
                                            ...this.renderCards()
                                        ]


                                    }
                                />)
                            }}/>
                            <Route exact path={`${this.props.match.path}/${this.props.city.name}`}
                                   render={() => <WeatherCardsCarousel path={this.props.location.pathname}/>}/>
                            </Switch>


                        </div>

                    </div>
                </div>

            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
         usersTown: state.firestore.ordered.usersTowns[0],
        city: state.weatherReducer.city,
        town: state.userDataReducer.town,
        towns: state.firestore.ordered.listOfTown || [],
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
    )
)(UsersWeather);
