import React, {Component} from 'react';
import {connect} from "react-redux";

import {userToFirebaseActions, weatherActions} from '../actions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';

class AddTownCard extends Component {
    state = {
        isOpen: false,
        addedTown: ''
    }

    addingTown = (e) => {
        e.preventDefault();
        this.props.fetchWeather(this.state.addedTown);
        if(this.props.weather.list.length) {
            this.props.addTown(this.props.weather.city.name, this.props.testTowns);
        }
    }


    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleChange = (e) => {
        this.setState({
            addedTown: e.target.value
        })
    }

    render() {
        return (
            <div className="users-card">
                {this.state.isOpen
                    ? <form onSubmit={this.addingTown}>
                        <input type="text" className="input users-card__input" onChange={this.handleChange}/>
                        <button className="btn users-card__btn" type="submit">add</button>
                        <FontAwesomeIcon icon={faTimes} onClick={this.handleClick}/>
                    </form>
                    : <FontAwesomeIcon icon={faPlus} onClick={this.handleClick}/>
                }
            </div>

        )
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
        addTown: (name, list) => dispatch(userToFirebaseActions.addTownToFirebase(name, list))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTownCard)