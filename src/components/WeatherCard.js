import React from 'react';
import convertTemperature from "./convertTemperaure";

export default function WeatherCard(props) {
    const {info} = props;
    return (
        <div style={{color: 'black'}}>
           <div>
               <p>{convertTemperature(info.main.temp)}</p>
               <img src={`https://openweathermap.org/img/w/${info.weather[0].icon}.png`}
                 alt="" style={{width: '20px', height: '20px'}}/>
           </div>
            <div>
                <p>min/max</p>
                <p>{convertTemperature(info.main.temp_min)}/{convertTemperature(info.main.temp_max)}</p>
            </div>
            <div>
                <p>wind</p>
                <p>{info.wind.speed}m/h /{info.wind.deg}</p>
            </div>
        </div>
    )
}

