import React, { Component } from "react";
import { connect } from "react-redux";

import { userToFirebaseActions, weatherActions } from "../actions";
class AddTownCard extends Component {
  state = {
    isOpen: false,
    addedTown: ""
  };

  addingTown = async e => {
    e.preventDefault();
    const res = await this.props.fetchWeather(this.state.addedTown);
    if (res) {
      this.props.addTown(this.props.weather.city, this.props.usersTowns);
    }
  };

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleChange = e => {
    this.setState({
      addedTown: e.target.value
    });
  };

  render() {
    return <div className="users-card">
        {this.state.isOpen ? <form onSubmit={this.addingTown} className="users-card-form">
            <input type="text"
                   placeholder="Enter town"
                   className="input users-card-form__input"
                   onChange={this.handleChange} />
            <div className="users-card-form__submit">
              <button className="btn users-card-form__submit-btn" type="submit">
                add
              </button>
              <button className="btn users-card-form__submit-btn" onClick={this.handleClick}>
                cancel
              </button>
            </div>
          </form> : <div className="users-card__add">
            <div className="users-card__add-item" onClick={this.handleClick} />
          </div>
        // : <FontAwesomeIcon className="users-card__add" icon={faPlus} onClick={this.handleClick}/>
        }
      </div>;
  }
}

const mapStateToProps = state => {
  return {
    weather: state.weatherReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWeather: search => dispatch(weatherActions.fetchWeather(search)),
    addTown: (name, list) =>
      dispatch(userToFirebaseActions.addTownToFirebase(name, list))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTownCard);
