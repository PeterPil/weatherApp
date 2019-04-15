import React, {Component} from 'react';
import {userToFirebaseActions} from '../actions';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import UsersCard from "./UsersCard";

import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css";
import AddTownCard from "./AddTownCard";
import {Redirect} from "react-router";

const TOWN = [
    {
        id: 1,
        name: 'Ternopil'
    },
    {
        id: 2,
        name: 'Barcelona'
    },
    {
        id: 3,
        name: 'Rivne'
    },
    {
        id: 4,
        name: 'Tel Aviv'
    },
    {
        id: 5,
        name: 'Azerbaidzjan'
    }
];

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

const stagePadding = {
    paddingLeft: 15,
    paddingRight: 15
}


class UsersWeather extends Component {
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
                            {/*<AddTownCard/>*/}
                            <AliceCarousel
                                mouseDragEnabled
                                responsive={responsive}
                                infinite={false}
                                stagePadding={stagePadding}
                                items={
                                    // TOWN ? TOWN.map((town) => <UsersCard town={town} key={town.id}/>) : null
                                    this.props.towns ? this.props.towns.map((town) => <UsersCard town={town} key={town.id}/>): null
                                }
                            />


                        </div>
                    </div>
                </div>

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
