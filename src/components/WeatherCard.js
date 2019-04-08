import React from 'react';
import connect from "react-redux/es/connect/connect";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';


import convertTemperature from "./convertTemperaure";
import {format} from "date-fns";
import {weatherActions} from "../actions";


function WeatherCard(props) {
    const {info} = props;
    return (
        <div className="col-lg-3">
            <div className="weather-cards-content-item" onClick={() => {props.setWeatherDay(info.dt_txt); props.setWeatherType(true)}}>
                <div className="weather-cards-content-item__main weather-cards-content-item__main--center">
                    <p className="weather-cards-content-item__main-temp">
                        {convertTemperature(info.main.temp)}&deg;C
                    </p>
                    <img src={`https://openweathermap.org/img/w/${info.weather[0].icon}.png`}
                         alt=""
                         className="weather-cards-content-item__main-clouds"/>
                </div>
                <div className="weather-cards-content-item__main">
                    <p className="weather-cards-content-item__main-text">
                        min/max
                    </p>
                    <p className="weather-cards-content-item__main-value">
                        {convertTemperature(info.main.temp_min)}&deg;C
                        /{convertTemperature(info.main.temp_max)}&deg;C
                    </p>
                </div>
                <div className="weather-cards-content-item__main">
                    <p className="weather-cards-content-item__main-text">
                        wind
                    </p>
                    <p className="weather-cards-content-item__main-value">
                        {info.wind.speed}m/h / <FontAwesomeIcon icon={faLongArrowAltUp}
                                                                style={{transform: `rotate(${info.wind.deg}deg)`}}/>
                    </p>
                </div>
                <div>{props.isDailyWeather
                    ? format(info.dt_txt, 'HH:mm')
                    : format(info.dt_txt, 'DD MMMM YYYY')}

                </div>
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        isDailyWeather: state.weatherReducer.isDailyWeather,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setWeatherDay: date => dispatch(weatherActions.setWeatherDay(date)),
        setWeatherType: weatherType => dispatch(weatherActions.setWeatherType(weatherType))
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeatherCard);

