import React from "react";
import { Link, withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";

import { format } from "date-fns";
import { weatherActions } from "../actions";

function capitalizeFirstLetter(row) {
  return row.charAt(0).toUpperCase() + row.slice(1);
}

function WeatherCard(props) {
  const { info } = props;
  return (
    <div
      className="weather-cards-content-item"
      onClick={() => {
        props.setWeatherDay(info.dt_txt);
        props.setWeatherType("today");
      }}
    >
      <Link to={`/${props.match.params.townId}/${format(info.dt_txt, "YYYY-MM-DD")}`}>
        <div className="weather-cards-content-item__date">
          {props.weatherType === "today"
            ? format(info.dt_txt, "HH:mm")
            : format(info.dt_txt, "DD MMMM YYYY")}
        </div>
        <div className="weather-cards-content-item__main weather-cards-content-item__main--center">
          <p className="weather-cards-content-item__main-temp">
            {Math.round(info.main.temp)}&deg;C
          </p>
          <img
            src={`https://openweathermap.org/img/w/${info.weather[0].icon}.png`}
            alt=""
            className="weather-cards-content-item__main-clouds"
          />
        </div>
        <p className="weather-cards-content-item__descr">
          {capitalizeFirstLetter(info.weather[0].description)}
        </p>
        <div className="weather-cards-content-item__main">
          <p className="weather-cards-content-item__main-text">min/max</p>
          <p className="weather-cards-content-item__main-value">
            {Math.round(info.main.temp_min)}&deg;C /
            {Math.round(info.main.temp_max)}&deg;C
          </p>
        </div>
        <div className="weather-cards-content-item__main">
          <p className="weather-cards-content-item__main-text">wind</p>
          <p className="weather-cards-content-item__main-value">
            {info.wind.speed}m/s /{" "}
            <FontAwesomeIcon
              icon={faLongArrowAltUp}
              style={{ transform: `rotate(${info.wind.deg}deg)` }}
            />
          </p>
        </div>
        <div className="weather-cards-content-item__main">
          <p className="weather-cards-content-item__main-text">pressure</p>
          <p className="weather-cards-content-item__main-value">
            {info.main.pressure} hPa
          </p>
        </div>
        <div className="weather-cards-content-item__main">
          <p className="weather-cards-content-item__main-text">humidity</p>
          <p className="weather-cards-content-item__main-value">
            {info.main.humidity} %
          </p>
        </div>
      </Link>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    weatherType: state.weatherReducer.weatherType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWeatherDay: date => dispatch(weatherActions.setWeatherDay(date)),
    setWeatherType: weatherType =>
      dispatch(weatherActions.setWeatherType(weatherType))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherCard));
