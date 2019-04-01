import React from 'react';

export default function WeatherCard({town}) {
    return (
        <div style={{color: 'black'}}>
            {town.name}
            {console.log(town.name)}
        </div>
    )
}