import React, { Component } from "react";
import { userToFirebaseActions } from "../actions";
import { connect } from "react-redux";
import { compose } from "redux";
import UsersCard from "./UsersCard";
import { withRouter } from "react-router";
import AliceCarousel from "react-alice-carousel";
import { Redirect, Route, Switch } from "react-router";
import AddTownCard from "./AddTownCard";
import UserPrevButton from "./UserPrevButton";
import WeatherCards from "./WeatherCards";

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
    townName: ""
  };

  setUrlPath = name => {
    this.setState({
      townName: name
    });
  };

  renderCards() {
    return this.props.usersTown
      ? this.props.usersTown.town.map(town => (
          <UsersCard
            town={town}
            key={town.id}
            usersTowns={this.props.usersTown.town}
            path={this.props.match.path}
          />
        ))
      : [];
  }

  render() {
    return (
      <section className="users-section">
        <div className="container">
          <div className="users-weather">
            <h1 className="users-weather__title">
              <UserPrevButton
                {...this.props}
                className="bordered-btn users-weather-btn"
              />
              UsersWeather
            </h1>

            <Switch>
              <Route
                exact
                path={`${this.props.match.path}`}
                render={() => {
                  return (
                    <div className="row">
                      <div className="users-weather__items">
                        <AliceCarousel
                          mouseDragEnabled
                          responsive={responsive}
                          infinite={false}
                          items={[
                            this.props.usersTown ? (
                              <AddTownCard
                                usersTowns={this.props.usersTown.town}
                              />
                            ) : null,
                            ...this.renderCards()
                          ]}
                        />
                      </div>
                    </div>
                  );
                }}
              />
              <Route
                path={`${this.props.match.path}/:townId`}
                component={WeatherCards}
              />
            </Switch>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersTown: state.firestore.ordered.usersTowns
      ? state.firestore.ordered.usersTowns[0]
      : {},
    city: state.weatherReducer.city,
    isEmpty: state.firebase.auth.isEmpty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTowns: town => dispatch(userToFirebaseActions.getTowns(town))
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UsersWeather);
