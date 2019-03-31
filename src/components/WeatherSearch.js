import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchWeather, townInDatabase } from '../actions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import store from '../store/store';

class WeatherSearch extends Component {
  changeTown = e => this.setState({ town: e.target.value });
  submitTown = e => {
    if (this.refs.refTown !== null) {
      const input = this.refs.refTown;
      const inputValue = input.value;
      this.props.setSearchValue(input.value);
      this.props.fetchWeather(this.props.searchParams);
      this.props.getTowns(inputValue);
    }
  };
  cancelSearchTown = e => {
    e.preventDefault();
    this.refs.refTown.value = '';
    this.props.resetSearch();
  };
  weatherType = e => {
    e.preventDefault();

    this.props.setWeatherType(!this.props.searchParams.isDailyWeather);
  };

  componentDidMount() {}

  render() {
    console.log(store.firebase);
    return (
      <section className="weather-search">
        <div className="container">
          <h1 className="weather-search__title">
            Check the weather in your town
          </h1>

          <div className="weather-search-field">
            <input
              type="text"
              placeholder="Enter town"
              ref="refTown"
              className="weather-search-field__input"
            />
            <button
              type="submit"
              onClick={this.submitTown}
              className="weather-search-field__button"
            >
              Submit
            </button>
            <div onClick={this.cancelSearchTown}>x</div>
            <div onClick={this.weatherType}>daily</div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchParams: state.searchParams
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchValue: value =>
      dispatch({ type: 'SET_SEARCH_VALUE', searchValue: value }),
    setWeatherType: value =>
      dispatch({ type: 'SET_WEATHER_TYPE', isDailyWeather: value }),
    resetSearch: () => dispatch({ type: 'RESET_SEARCH' }),
    fetchWeather: search => {
      dispatch(searchWeather.fetchWeather(search));
    },
    getTowns: town => dispatch(townInDatabase.getTowns(town))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(() => [{ collection: 'listOfTown' }])
)(WeatherSearch);
