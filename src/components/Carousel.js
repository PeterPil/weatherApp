import React, { Component } from "react";
import { format } from "date-fns";
import WeatherCardsCarousel from "./WeatherCardsCarousel";
import connect from "react-redux/es/connect/connect";
import { weatherActions } from "../actions";
import { withRouter } from "react-router";

class Carousel extends Component {
  componentDidMount() {
    this.props.fetchWeather(this.props.match.params.townId);
    if (
      this.props.match.url === `/${this.props.weather.city.name}` ||
      this.props.match.url === `/users-weather/${this.props.weather.city.name}`
    ) {
      this.props.setWeatherTypeReducer("fiveDay");
    }
    console.log(this.props.match.url, `/${this.props.weather.city.name}`);
    
  }
  renderDate(weather) {
    if (weather.weatherType === "today") {
      return format(weather.weatherDay, "DD");
    } else {
      return null;
    }
  }
  render() {
    const { weather } = this.props;
    return (
      <section className="weather-cards">
        <h2 className="weather-cards__title">
          {weather.city.name},{weather.city.country}
          {this.renderDate(weather)}
        </h2>
        <div className="row">
          <div className="weather-cards-content">
            <WeatherCardsCarousel weather={weather} />
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
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
export { RoutedCarousel, ConnectedCarousel };
