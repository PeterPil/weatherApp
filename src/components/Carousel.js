import {format} from "date-fns";
import WeatherCardsCarousel from "./WeatherCardsCarousel";
import connect from "react-redux/es/connect/connect";
import React from "react";

function Carousel({weather, routeLocation}){
   function renderDate(){
    if(weather.weatherType === 'today') {
      return format(weather.weatherDay, "DD")
    } else {
      return null;
    }
  }
  return (
        <section className="weather-cards">
        <h2 className="weather-cards__title">
          {weather.city.name},{weather.city.country}
          {renderDate()}
        </h2>
        <div className="row">
          <div className="weather-cards-content">
            <WeatherCardsCarousel routeLocation={routeLocation} weather={weather}/>
          </div>
        </div>
      </section>
  )
}

function mapStateToProps(state) {
  return {
    weather: state.weatherReducer
  };
};

const ConnectedCarousel = connect(
  mapStateToProps,
  {}
  )(Carousel)
export {Carousel, ConnectedCarousel};

