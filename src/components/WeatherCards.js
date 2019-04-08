import React, {Component} from 'react';
import {connect} from 'react-redux';
import filterWeather from './filterWeather';
import WeatherCard from "./WeatherCard";
import {format} from "date-fns";

class WeatherCards extends Component {
    render() {
        const {weather} = this.props;
        return (
            <section className="weather-cards">
                <div className="container">
                    <h2 className="weather-cards__title">
                        {weather.city.name},
                        {weather.city.country}
                        {format(weather.weatherDay, "DD")}
                    </h2>
                    <div className="weather-cards-content">

                        {weather.list.length ?
                            filterWeather(weather).map(item => <WeatherCard key={item.dt} info={item}/>)
                            : null
                        }
                    </div>

                </div>

            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        weather: state.weatherReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeatherCards);
