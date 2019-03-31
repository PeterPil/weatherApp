import React, { Component } from 'react';
import api from '../api';
import { transliterate as tr } from 'transliteration';
import Header from './Header';
import Main from './Main';
import WeatherSearch from './WeatherSearch';
import UsersWeather from './UsersWeather';
import { Route, Switch } from 'react-router';
import SignIn from './SignIn';

class Weather extends Component {
  render() {
    return (
      <div className="wrap">
        <Header />
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/" component={WeatherSearch} />
        </Switch>
        <Route path="/" component={UsersWeather} />
      </div>
    );
  }
}

export default Weather;
