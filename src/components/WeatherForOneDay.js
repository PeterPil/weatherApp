import { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import React from "react";
import { Carousel } from "./Carousel";

class WeatherForOneDay extends Component {
  render() {
    const data = this.props.weatherList.filter(
      item => item.dt_txt.split(" ")[0] === this.props.match.params.date
    );
    if (!data.length) {
      return <div>Error </div>;
    }
    return (
      <Carousel
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

export default withRouter(
  connect(
    state => ({
      weatherList: state.weatherReducer.list,
      city: state.weatherReducer.city
    }),
    {}
  )(WeatherForOneDay)
);
