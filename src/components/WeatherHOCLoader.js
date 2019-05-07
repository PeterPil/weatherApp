import Weather from "./Weather";
import React from "react";
import Loader from "react-loader-spinner";
import {connect} from "react-redux";


function WeatherHOCLoader(props) {
  return props.isLoading ? (
    <div className="wraper-load">
      <Loader type="Oval" color="#fff" height="50" width="50" />
    </div>
  ) : (
    <Weather />
  );
}

export default connect(state => ({isLoading: state.loaderReducer.isLoading}))(WeatherHOCLoader)