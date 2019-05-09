import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { weatherActions } from "../actions";
import { ConnectedCarousel } from "./Carousel";
import WeatherForOneDay from "./WeatherForOneDay";

class WeatherCards extends Component {
  scrollRef = React.createRef();
  componentDidMount() {
    const position = this.scrollRef.current.offsetTop;
    window.scroll(0, position)
  }
  
  componentDidUpdate(nextProps) {
    if(this.props.match.url !== nextProps.match.url) {
      const position = this.scrollRef.current.offsetTop;
        window.scroll(0, position)

    }
  }
  render() {
    return (
      <div ref={this.scrollRef}>
        <Switch>
          <Route
            path={`${this.props.match.path}/:date`}
            component={WeatherForOneDay}
          />
          <Route
            exact
            path={`${this.props.match.path}`}
            component={ConnectedCarousel}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoadingFetch: state.loaderReducer.isLoadingFetch,
    weather: state.weatherReducer
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchWeather: search => dispatch(weatherActions.fetchWeather(search))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WeatherCards)
);
