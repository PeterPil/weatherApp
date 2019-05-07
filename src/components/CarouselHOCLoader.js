import React from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import CarouselItem from "./CarouselItem";

function CarouselItemHOCLoader(props) {
  return props.isLoadingFetch ? (
    <div className="wraper-load-fetch">
            <Loader type="Oval" color="#fff" height="50" width="50" />

    </div>
  ) : (
    <CarouselItem weather={props.weather}/>
  );
}

export default connect(state => ({
  isLoadingFetch: state.loaderReducer.isLoadingFetch
}))(CarouselItemHOCLoader);

