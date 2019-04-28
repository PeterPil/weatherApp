import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {userToFirebaseActions, weatherActions} from '../actions';
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {Link, Route} from "react-router-dom";
import WeatherCards from "./WeatherCards";
import {withRouter} from "react-router";

class WeatherSearch extends Component {

    state = {
        searchTown: '',
        weatherType: 'daily',
        searchError: null,
        errTownAdd: false,
        redirect: false
    };
    refTown = React.createRef();


    submitTown = e => {
        e.preventDefault();
        this.props.fetchWeather(this.state.searchTown);
        this.props.setWeatherTypeReducer(this.state.weatherType);
        this.props.history.push(`${this.props.match.path}/${this.state.searchTown}`)

    };

    addingTown = () => {
        if (!this.props.isEmpty) {
            if (this.state.searchTown === '') {
                return this.setState({searchError: "Can't add empty string"})
            }
            if (!this.props.list.length) {
                return this.setState({searchError: "There is no city. Try again"})
            }
            this.props.addTownToFirebase(this.props.city, this.props.usersTown.town);
            this.setState({searchError: null})
            return this.setState({
                errTownAdd: false
            })
        }
        this.setState({
            errTownAdd: true
        })

    }
    cancelSearchTown = e => {
        this.refTown.current.value = '';
        this.setState({searchTown: ''})
    };
    setWeatherType = e => {
        this.setState({
            weatherType: e.currentTarget.value
        })

    };

    handleChange = (e) => {
        this.setState({searchTown: e.target.value})
    };


    render() {
        return (
            <section className="weather-search">
                <div className="container">
                    <h1 className="weather-search__title">
                        Check the weather in your town
                    </h1>
                    <div className="weather-search-container">
                        <form className="weather-search-field" onSubmit={this.submitTown}>
                            <input
                                type="text"
                                id="text"
                                placeholder="Enter town"
                                ref={this.refTown}
                                className="input weather-search-field__input"
                                onChange={this.handleChange}
                            />
                            <button type="submit" className="weather-search-field__button">
                                submit
                            </button>
                            <FontAwesomeIcon onClick={this.cancelSearchTown}
                                             icon={faTimes}
                                             className="weather-search-field__cancel"
                            />


                        </form>
                        <div className="weather-search-params">
                            <div className="weather-search-params-type">
                                <label className="weather-search-params-type__item">
                                    <input type="radio"
                                           name="weatherType"
                                           value="daily"
                                           checked={this.state.weatherType === "daily"}
                                           onChange={this.setWeatherType}
                                           className="weather-search-params-type__item-input"
                                    />
                                    Today weather
                                    <span className="weather-search-params-type__item-check"></span>
                                </label>

                                <label className="weather-search-params-type__item">
                                    <input type="radio"
                                           name="weatherType"
                                           value="fiveDay"
                                           checked={this.state.weatherType === "fiveDay"}
                                           onChange={this.setWeatherType}
                                           className="weather-search-params-type__item-input"
                                    />
                                    5 Day weather
                                    <span className="weather-search-params-type__item-check"></span>
                                </label>
                            </div>
                            <button className="weather-search-params__add"
                                    onClick={this.addingTown}
                            >
                                Add town
                            </button>
                        </div>
                        {this.state.searchError && <p className="weather-search__error">{this.state.searchError}</p>}
                        <p>{this.props.errorAddTown}</p>
                        {
                            this.state.errTownAdd &&
                            <p className="weather-search__error-add">
                                Can't add town, you must be loged in. You may do it there
                                <Link to='/sign-in'
                                      className="sign-in-form__registrations"
                                >
                                    >
                                </Link>
                            </p>
                        }
                    </div>
                    {this.props.list.length ?
                        <Route path={`${this.props.match.path}/:townid`} component={WeatherCards}/> : null}


                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        usersTown: state.firestore.ordered.usersTowns[0],
        town: state.userDataReducer.town,
        isEmpty: state.firebase.auth.isEmpty,
      city: state.weatherReducer.city,
        list: state.weatherReducer.list,
        weatherType: state.weatherReducer.weatherType,
        errorAddTown: state.townToFirebaseReducer.errAdd
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchWeather: search => dispatch(weatherActions.fetchWeather(search)),
        addTownToFirebase: (town, townsList) => dispatch(userToFirebaseActions.addTownToFirebase(town, townsList)),
        setWeatherTypeReducer: weatherType => dispatch(weatherActions.setWeatherType(weatherType)),

    };
};

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect(() => [{collection: 'listOfTown'}])
)(WeatherSearch);
