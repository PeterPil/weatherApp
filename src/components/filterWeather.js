import {format} from 'date-fns';


export default function filterWeather(weather) {
    if (weather.isDailyWeather) {
        return weather.list.filter(
            item =>
                format(item.dt_txt, 'dd') ===
                format(weather.list[0].dt_txt, 'dd')
        );

    } else {
        return weather.list.filter(
            item =>
                format(item.dt_txt, 'HH:mm:ss') ===
                format(weather.list[0].dt_txt, 'HH:mm:ss')
        );
    }

}