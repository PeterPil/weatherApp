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
      item => {
        console.log(format(item.dt_txt, "YYYY-DD-HH"), this.props.match.params.date);
        // console.log(item.dt_txt);
        return format(item.dt_txt, "YYYY-DD-HH") === this.props.match.params.date
      }
    );
    // console.log(format(new Date(this.props.match.params.date), "YYYY-DD-HH"));
    return (
      <RoutedCarousel
        weather={{
          list: data,
          city: this.props.city,
          weatherType: "today",
          weatherDay: format(new Date(this.props.match.params.date), "YYYY-DD-HH")
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
