import React, {Component} from 'react';
import {connect} from 'react-redux';
import {format} from "date-fns";
import WeatherCard from "./WeatherCard";
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css";
import filterWeather from "./filterWeather";

const resp = {
    0: {
        items: 1
    },
    1024: {
        items: 4
    },
    768: {
        items: 3
    },
    550: {
        items: 2
    }
};

class WeatherCards extends Component {

    componentDidUpdate(prevState, prevProps) {
        console.log("props", this.props);
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log("next",nextProps);
    }

    onSlideChange = (e) => {
        console.log('Item`s position during a change: ', e.item)
        console.log('Slide`s position during a change: ', e.slide)
    }

    render() {
        const {weather} = this.props;
        console.log("render");
        return (
            <section className="weather-cards">

                <div className="container">
                    <h2 className="weather-cards__title">
                        {weather.city.name},
                        {weather.city.country}
                        {format(weather.weatherDay, "DD")}
                    </h2>
                    <div className="weather-cards-content">
                        <AliceCarousel
                            items={weather.list.length ?
                                filterWeather(weather).map(item => {console.log("render item");return <WeatherCard key={item.dt} info={item}/>})
                                : null
                            }
                            mouseDragEnabled
                            responsive={resp}
                            onSlideChange={this.onSlideChange}
                            ref={(el) => (this.Carousel = el)}
                        >


                        </AliceCarousel>
{/*{weather.list.length ?*/}
                                {/*filterWeather(weather).map(item => <WeatherCard key={item.dt} info={item}/>)*/}
                                {/*: null*/}
                            {/*}*/}
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
