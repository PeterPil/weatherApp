import React, { Component } from "react";
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { weatherActions} from '../actions';
import {ConnectedCarousel} from "./Carousel";
import WeatherForOneDay from "./WeatherForOneDay";


class WeatherCards extends Component {
  componentDidMount(){
    this.props.fetchWeather(this.props.match.params.townId)
  }
 
  render() {
    const { routeLocation } = this.props;
    console.log("this.props.match.path", this.props)
    return <div>
        <Switch>
          <Route exact path={`${this.props.match.path}/:date`}
                 render={() => <WeatherForOneDay />} />
          <Route path={this.props.match.path}
                 render={() =>
                   <ConnectedCarousel routeLocation={routeLocation} />
                 }
          />
        </Switch>
      </div>;
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weatherReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
     fetchWeather: search => dispatch(weatherActions.fetchWeather(search))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherCards));
