import AliceCarousel from "react-alice-carousel";
import React from "react";
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
  return (
    <AliceCarousel
      infinite={false}
      items={
        weather.list.length
          ? filterWeather(weather).map(item => (
              <WeatherCard key={item.dt} info={item} />
            ))
          : []
      }
      mouseDragEnabled
      responsive={resp}
    />
  );
}
