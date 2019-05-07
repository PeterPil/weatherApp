import React, { Component } from "react";
import { format } from "date-fns";
import WeatherCardsCarousel from "./WeatherCardsCarousel";
import connect from "react-redux/es/connect/connect";
import { weatherActions } from "../actions";
import { withRouter } from "react-router";
import Loader from "react-loader-spinner";
import CarouselItemHOCLoader from "./CarouselHOCLoader";
import CarouselItem from "./CarouselItem";

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
  
  render() {
    
    const { weather } = this.props;
    return (
      <CarouselItemHOCLoader weather={weather}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoadingFetch: state.loaderReducer.isLoadingFetch,
    weather: state.weatherReducer
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
export { RoutedCarousel, ConnectedCarousel};
