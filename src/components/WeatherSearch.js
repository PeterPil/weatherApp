import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userToFirebaseActions, weatherActions} from '../actions';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';

class WeatherSearch extends Component {
    state = {
        searchTown: '',
        isDailyWeather: true,
        searchError: null
    }
    submitTown = e => {
        if (this.refs.refTown !== null) {
            const input = this.refs.refTown;
            const inputValue = input.value;
            this.setState({searchTown: inputValue})
            this.props.fetchWeather(inputValue);
        }
    };

    addingTown = () => {
        if(this.state.searchTown === '') {
            return this.setState({searchError: "Can't add empty string"})
        }
        if(!this.props.list.length) {
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

    };

    handleChange = (e) => {
        this.setState({ searchTown: e.target.value })
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
                            className="weather-search-field__input"
                            onChange={this.handleChange}
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
                        <div className="add"
                             onClick={this.addingTown}
                        >
                            add
                        </div>
                        {this.state.searchError && <p>{this.state.searchError}</p>}
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        searchParams: state.searchParams,
        list: state.weatherList.list
    };
};

const mapDispatchToProps = dispatch => {
    return {

        fetchWeather: search => {
            dispatch(weatherActions.fetchWeather(search));
        },
        addTownToFirebase: town => dispatch(userToFirebaseActions.addTownToFirebase(town))
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect(() => [{collection: 'listOfTown'}])
)(WeatherSearch);
