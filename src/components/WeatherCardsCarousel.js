import filterWeather from "./filterWeather";
import WeatherCard from "./WeatherCard";
import AliceCarousel from "react-alice-carousel";
import React from "react";
import connect from "react-redux/es/connect/connect";

const resp = {
    0: {
        items: 1
    },
    992: {
        items: 4
    },
    550: {
        items: 2
    }

};


function WeatherCardsCarousel(props) {
    const {weather} = props;
    return (
        <AliceCarousel
            items={weather.list.length ?
                filterWeather(weather).map(item => <WeatherCard key={item.dt} info={item}/>)
                : null
            }
            mouseDragEnabled
            responsive={resp}
        >
        </AliceCarousel>
    )

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
)(WeatherCardsCarousel);
