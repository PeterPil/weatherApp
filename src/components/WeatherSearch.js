import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { userToFirebaseActions, weatherActions } from "../actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { Route, withRouter } from "react-router-dom";
import WeatherCards from "./WeatherCards";
import { toast } from "react-toastify";
import SignInRedirect from "./SignInRedirect";

class WeatherSearch extends Component {
  
  state = {
    searchTown: "",
    weatherType: "today",
    searchError: null,
    errTownAdd: false,
    redirect: false
  };

  submitTown = e => {
    e.preventDefault();
    if (this.state.searchTown === "") {
      toast.error("Enter correct town");
      return;
    }
    this.props.fetchWeather(this.state.searchTown);
    this.props.setWeatherTypeReducer(this.state.weatherType);
    if (this.state.weatherType === "today") {
      const todayDate = format(new Date(), "YYYY-MM-DD");
      this.props.history.push(`/${this.state.searchTown}/${todayDate}`);
    } else if (this.state.weatherType === "fiveDay") {
      this.props.history.push(`/${this.state.searchTown}`);
    }
  };
  
  addingTown = () => {
    if (!this.props.isEmpty) {
      if (!this.props.list.length) {
        toast.error("There is no city. Try again");
        return;
      }
      this.props.addTownToFirebase(this.props.city, this.props.usersTown.town);
    } else {
      toast.warn(<SignInRedirect />)
    }
  };
  cancelSearchTown = e => {
    this.setState({ searchTown: "" });
  };
  setWeatherType = e => {
    this.setState({
      weatherType: e.currentTarget.value
    });
  };

  handleChange = e => {
    this.setState({ searchTown: e.target.value });
  };

  render() {
    return (
      <section className="weather-search">
        <div className="container">
          <h1 className="weather-search__title">
            Check the weather in your town
          </h1>
          <form className="weather-search-form" onSubmit={this.submitTown}>
            <div className="weather-search-field">
              <input
                type="text"
                id="text"
                placeholder="Enter town"
                value={this.state.searchTown}
                className="input weather-search-field__input"
                onChange={this.handleChange}
              />
              <button type="submit" className="weather-search-field__button">
                submit
              </button>
              <FontAwesomeIcon
                onClick={this.cancelSearchTown}
                icon={faTimes}
                className="weather-search-field__cancel"
              />
            </div>
            <div className="weather-search-params">
              <div className="weather-search-params-type">
                <label className="weather-search-params-type__item">
                  <input
                    type="radio"
                    name="weatherType"
                    value="today"
                    checked={this.state.weatherType === "today"}
                    onChange={this.setWeatherType}
                    className="weather-search-params-type__item-input"
                  />
                  Today weather
                  <span className="weather-search-params-type__item-check" />
                </label>

                <label className="weather-search-params-type__item">
                  <input
                    type="radio"
                    name="weatherType"
                    value="fiveDay"
                    checked={this.state.weatherType === "fiveDay"}
                    onChange={this.setWeatherType}
                    className="weather-search-params-type__item-input"
                  />
                  5 Day weather
                  <span className="weather-search-params-type__item-check" />
                </label>
              </div>
              <button
                type="button"
                className="weather-search-params__add"
                onClick={this.addingTown}
              >
                Add town
              </button>
            </div>
          </form>

          <Route path={`/:townId`} component={WeatherCards} />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoadingFetch: state.loaderReducer.isLoadingFetch,
    usersTown: state.firestore.ordered.usersTowns
      ? state.firestore.ordered.usersTowns[0]
      : {},
    isEmpty: state.firebase.auth.isEmpty,
    city: state.weatherReducer.city,
    list: state.weatherReducer.list,
    weatherType: state.weatherReducer.weatherType,
    weatherDay: state.weatherReducer.weatherDay
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWeather: search => dispatch(weatherActions.fetchWeather(search)),
    addTownToFirebase: (town, townsList) =>
      dispatch(userToFirebaseActions.addTownToFirebase(town, townsList)),
    setWeatherTypeReducer: weatherType =>
      dispatch(weatherActions.setWeatherType(weatherType))
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WeatherSearch);
