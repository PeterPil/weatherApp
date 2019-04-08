import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {userToFirebaseActions, weatherActions} from '../actions';
import WeatherCards from "./WeatherCards";
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

class WeatherSearch extends Component {
    state = {
        searchTown: '',
        isDailyWeather: true,
        searchError: null
    }
    submitTown = e => {
        if (this.refs.refTown !== null) {
            const input = this.refs.refTown;
            console.log(this.refs.refTown.value === '\n');
            const inputValue = input.value;
            this.setState({searchTown: inputValue});
            this.props.fetchWeather(inputValue);

        }
    };

    addingTown = () => {
        if (this.state.searchTown === '') {
            return this.setState({searchError: "Can't add empty string"})
        }
        if (!this.props.list.length) {
            return this.setState({searchError: "There is no city. Try again"})
        }
        this.props.addTownToFirebase(this.state.searchTown);
        this.setState({searchError: null})
    }
    cancelSearchTown = e => {
        e.preventDefault();
        this.refs.refTown.value = '';
        this.setState({searchTown: ''})
    };
    weatherType = e => {
        e.preventDefault();
        this.setState({
            isDailyWeather: e.currentTarget.value
        })
        this.props.setWeatherType(e.currentTarget.value);

    };

    handleChange = (e) => {
        this.setState({searchTown: e.target.value})
        if (e.keyCode === 13) {
            this.props.fetchWeather(e.target.value);
        }
    }
    keyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.fetchWeather(this.state.searchTown);
        }
    }

    render() {
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
                            className="input weather-search-field__input"
                            onChange={this.handleChange}
                            onKeyPress={this.keyPress}
                        />
                        <button
                            type="submit"
                            onClick={this.submitTown}

                            className="weather-search-field__button"
                        >
                            Submit
                        </button>
                        <FontAwesomeIcon onClick={this.cancelSearchTown}
                                         icon={faTimes}
                                         className="weather-search-field__cancel"
                        />


                    </div>
                    <div className="weather-search-params">
                        <div >
                            <div>
                                <label>
                                    <input type="radio"
                                           name="weatherType"
                                           value="daily"
                                           checked={this.state.isDailyWeather === "daily"}
                                           onChange={this.weatherType}
                                    />
                                    Day weather
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio"
                                           name="weatherType"
                                           value=""
                                           checked={this.state.isDailyWeather === ""}
                                           onChange={this.weatherType}
                                    />
                                    5 Day weather
                                </label>
                            </div>

                        </div>
                        <div onClick={this.weatherType}>daily</div>
                        <div className="add"
                             onClick={this.addingTown}
                        >
                            add
                        </div>
                    </div>

                    {this.state.searchError && <p>{this.state.searchError}</p>}
                    <WeatherCards/>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state.weatherReducer.list,
        isDailyWeather: state.weatherReducer.isDailyWeather,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchWeather: search => dispatch(weatherActions.fetchWeather(search)),
        addTownToFirebase: town => dispatch(userToFirebaseActions.addTownToFirebase(town)),
        setWeatherType: weatherType => dispatch(weatherActions.setWeatherType(weatherType)),

    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect(() => [{collection: 'listOfTown'}])
)(WeatherSearch);
