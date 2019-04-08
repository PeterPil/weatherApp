import {format} from 'date-fns';


export default function filterWeather(weather) {
    if (weather.isDailyWeather) {
        return weather.list.filter(
            item =>
                format(item.dt_txt, 'DD') ===
                format(weather.weatherDay, 'DD')
        );

    } else {
        return weather.list.filter(
            item =>
                format(item.dt_txt, 'HH:mm:ss') ===
                format(weather.weatherDay, 'HH:mm:ss')
        );
    }

}