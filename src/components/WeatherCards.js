import React, {Component} from 'react';
import {connect} from 'react-redux';
import {format} from "date-fns";
import "react-alice-carousel/lib/alice-carousel.css";
import WeatherCardsCarousel from "./WeatherCardsCarousel";


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
                        <WeatherCardsCarousel/>
                    </div>
                    {/*<button onClick={() => this.Carousel._slidePrev()}>Prev button</button>*/}
                    {/*<button onClick={() => this.Carousel._slideNext()}>Next button</button>*/}

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
