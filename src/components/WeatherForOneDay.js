import { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import React from "react";
import {Carousel, RoutedCarousel} from "./Carousel";
import * as weatherActions from "../actions/weatherActions";

class WeatherForOneDay extends Component {
  componentDidMount() {
    this.props.setWeatherTypeReducer("today");
  }
  render() {
    const data = this.props.weatherList.filter(
      item => item.dt_txt.split(" ")[0] === this.props.match.params.date
    );
    if (!data.length) {
      return <div>Error </div>;
    }
    return (
      <RoutedCarousel
        weather={{
          list: data,
          city: this.props.city,
          weatherType: "today",
          weatherDay: data[0].dt_txt
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    weatherList: state.weatherReducer.list,
      city: state.weatherReducer.city
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
    setWeatherTypeReducer: weatherType =>
      dispatch(weatherActions.setWeatherType(weatherType))
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WeatherForOneDay)
);
