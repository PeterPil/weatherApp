import { format } from "date-fns";

export default function filterWeather(weather) {
  switch (weather.weatherType) {
    case "today":
      return weather.list.filter(
        item => format(item.dt_txt, "DD") === format(weather.weatherDay, "DD")
      );
    case "fiveDay":
      return weather.list.filter(
        item =>
          format(item.dt_txt, "HH:mm:ss") ===
          format(weather.weatherDay, "HH:mm:ss")
      );
    default:
      return weather.list.filter(
        item =>
          format(item.dt_txt, "HH:mm:ss") ===
          format(weather.weatherDay, "HH:mm:ss")
      );
  }
}
