import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { weatherActions } from "../actions";
import { withRouter } from "react-router";
import CarouselItemHOCLoader from "./CarouselHOCLoader";

class Carousel extends Component {
  componentDidMount() {
    this.props.fetchWeather(this.props.match.params.townId);
    if (
      this.props.match.url === `/${this.props.weather.city.name}` ||
      this.props.match.url === `/users-weather/${this.props.weather.city.name}`
    ) {
      this.props.setWeatherTypeReducer("fiveDay");
    }
  }
  componentDidUpdate(nextProps) {
    if (this.props.match.url !== nextProps.match.url) {
      this.props.fetchWeather(this.props.match.params.townId);
      if (
        this.props.match.url === `/${this.props.weather.city.name}` ||
        this.props.match.url ===
          `/users-weather/${this.props.weather.city.name}`
      ) {
        this.props.setWeatherTypeReducer("fiveDay");
      }
    }
  }
  render() {
    const { weather, isError } = this.props;
    return isError ? (
      <p className="weather-search__error">
        No weather for {this.props.match.params.townId}
      </p>
    ) : (
      <CarouselItemHOCLoader weather={weather} />
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoadingFetch: state.loaderReducer.isLoadingFetch,
    weather: state.weatherReducer,
    isError: state.errorReducer.isError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWeather: search => dispatch(weatherActions.fetchWeather(search)),
    setWeatherTypeReducer: weatherType =>
      dispatch(weatherActions.setWeatherType(weatherType))
  };
}

const ConnectedCarousel = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Carousel)
);
const RoutedCarousel = withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Carousel)
);
export { RoutedCarousel, ConnectedCarousel };
