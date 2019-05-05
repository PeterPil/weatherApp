import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { weatherActions } from "../actions";
import { ConnectedCarousel } from "./Carousel";
import WeatherForOneDay from "./WeatherForOneDay";

class WeatherCards extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.path}/:date`}
            component={WeatherForOneDay}
          />
          <Route
            exact
            path={`${this.props.match.path}`}
            component={ConnectedCarousel}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weatherReducer
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchWeather: search => dispatch(weatherActions.fetchWeather(search))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WeatherCards)
);
