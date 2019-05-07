import React from "react";
import { connect } from "react-redux";

import { userToFirebaseActions } from "../actions";
import { weatherActions } from "../actions";
import { Link } from "react-router-dom";

function UsersCard(props) {
  return (
    <div className="users-card">
      <h2 className="users-card__title">
        <Link
          to={`${props.path}/${props.town.name}`}
          onClick={() => {
            props.fetchWeather(props.town.name);
            props.setWeatherTypeReducer("fiveDay");
          }}
        >
          {props.town.name}
        </Link>
      </h2>

      <div className="users-card-info">
        <p className="users-card-info__text">country</p>
        <p className="users-card-info__value">{props.town.country}</p>
      </div>
      <div className="users-card-info">
        <p className="users-card-info__text">location</p>
        <div className="users-card-info__value">
          <p className="users-card-info__value-text">
            lat: {props.town.coord.lat}
          </p>
          <p className="users-card-info__value-text">
            lon: {props.town.coord.lon}
          </p>
        </div>
        
      </div>
      <div className="users-card-info">
        <p className="users-card-info__text">population</p>
        <p className="users-card-info__value">{props.town.population}</p>
      </div>

      <button
        onClick={() => {
          props.deleteTown(props.town.id, props.usersTowns);
        }}
        className="btn users-card__btn "
      >
        Delete
      </button>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setWeatherTypeReducer: weatherType =>
      dispatch(weatherActions.setWeatherType(weatherType)),
    fetchWeather: search => dispatch(weatherActions.fetchWeather(search)),
    deleteTown: (id, townsList) =>
      dispatch(userToFirebaseActions.deleteTownFromFirebase(id, townsList))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UsersCard);
