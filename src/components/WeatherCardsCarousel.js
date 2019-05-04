import AliceCarousel from "react-alice-carousel";
import React from "react";
import { connect } from "react-redux";
import filterWeather from "./filterWeather";
import WeatherCard from "./WeatherCard";

const resp = {
  0: {
    items: 1
  },
  768: {
    items: 2
  },
  992: {
    items: 3
  },
  1200: {
    items: 4
  }
};

export default function WeatherCardsCarousel(props) {
  const { weather } = props;
  console.log('weather',  weather.list.length);
  return (
    <AliceCarousel
      infinite={false}
      items={
        weather.list.length
          ? filterWeather(weather).map(item => (
              <WeatherCard
                key={item.dt}
                info={item}
                routeLocation={props.routeLocation}
              />
            ))
          : []
      }
      mouseDragEnabled
      responsive={resp}
    />
  );
}

// const mapStateToProps = state => {
//   return {
//     weather: state.weatherReducer
//   };
// };
//
// const mapDispatchToProps = dispatch => {
//   return {};
// };
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(WeatherCardsCarousel);
