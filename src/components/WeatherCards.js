import React, {Component} from 'react';
import {connect} from 'react-redux';
import filterWeather from './filterWeather';
import WeatherCard from "./WeatherCard";

class WeatherCards extends Component {
    render() {
        const {weather} = this.props;
        return (
            <section>
                <div>{weather.city.name}, {weather.city.country}</div>
                {weather.list.length ?
                    filterWeather(weather).map(item => <WeatherCard key={item.dt} info={item}/>)
                    : null
                }
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
    return {
    };
};

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
)(WeatherCards);
