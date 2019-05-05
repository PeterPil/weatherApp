import api from "../api";
import { transliterate as tr } from "transliteration";

export const fetchWeather = searchValue => {
  return async (dispatch, getState) => {
    try {
      const params = {
        appid: "228473111bbbe3a150c7076ed8f93d03",
        q: tr(searchValue),
        units: "metric"
      };
      const apiResponse = await api.get("/forecast", { params });
      if (apiResponse.data.cod < 500) {
        const { cod, city, list } = apiResponse.data;
        if (Number.parseInt(cod) === 200) {
          dispatch({ type: "SET_DAY_OF_WEATHER", weatherDay: list[0].dt_txt });
          dispatch({ type: "SET_LIST_OF_WEATHER", list, city });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const setWeatherType = weatherType => {
  return dispatch => dispatch({ type: "SET_TYPE_OF_WEATHER", weatherType });
};

export const setWeatherDay = weatherDay => {
  return dispatch => dispatch({ type: "SET_DAY_OF_WEATHER", weatherDay });
};
