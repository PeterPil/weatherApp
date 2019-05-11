import { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import React from "react";
import { RoutedCarousel } from "./Carousel";
import {weatherActions} from "../actions";
import {format} from "date-fns";

class WeatherForOneDay extends Component {
  componentDidMount() {
    this.props.setWeatherTypeReducer("today");
  }
  render() {
    const data = this.props.weatherList.filter(
      item => format(item.dt_txt, "YYYY-MM-DD") === this.props.match.params.date
    );
    if (!data.length) {
      return (
        <p className="weather-search__error">No weather for this date</p>
      )
    }
    return (
      <RoutedCarousel
        weather={{
          list: data,
          city: this.props.city,
          weatherType: "today",
          weatherDay: format(new Date(this.props.match.params.date), "YYYY-MM-DD HH:MM:DD")
        }}
        isError={this.props.isError}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    weatherList: state.weatherReducer.list,
    city: state.weatherReducer.city,
    isError: state.errorReducer.isError
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setWeatherTypeReducer: weatherType =>
      dispatch(weatherActions.setWeatherType(weatherType))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WeatherForOneDay)
);
