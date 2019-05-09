import WeatherCardsCarousel from "./WeatherCardsCarousel";
import React from "react";
import { format } from "date-fns";

function renderDate(weather) {
  if (weather.weatherType === "today") {
    return format(weather.weatherDay, "DD.MM.YYYY");
  } else {
    return null;
  }
}

export default function CarouselItem(props) {
  const { weather } = props;
  return (
    <section className="weather-cards">
      <h2 className="weather-cards__title">
        {weather.city.name},{weather.city.country}
        {"  "}{renderDate(weather)}
      </h2>
      <div className="row">
        <div className="weather-cards-content">
          <WeatherCardsCarousel weather={weather} />
        </div>
      </div>
    </section>
  );
}
