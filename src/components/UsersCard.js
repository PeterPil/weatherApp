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
            props.setUrlPath(props.town.name);
          }}
        >
          {props.town.name}
        </Link>
      </h2>

      <button
        onClick={() => {
          props.deleteTown(props.town.id, props.testTowns);
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
