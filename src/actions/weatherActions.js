import { transliterate as tr } from "transliteration";

import { toast } from "react-toastify";

export const fetchWeather = searchValue => {
  return async (dispatch, getState) => {
    try {
      const params = {
        appid: "228473111bbbe3a150c7076ed8f93d03",
        q: tr(searchValue),
        units: "metric"
      };
      const url = new URL("https://api.openweathermap.org/data/2.5/forecast");
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      );
      dispatch({ type: "IS_LOADING_FETCH" });
      dispatch({ type: "RESET_ERROR" });

      const apiResponse = await fetch(url);
      const res = await apiResponse.json();
      dispatch({ type: "RESET_LOADING" });

      if (Number.parseInt(res.cod) < 500) {
        const { cod, city, list } = res;
        if (Number.parseInt(cod) === 404) {
          dispatch({ type: "SET_WEATHER_LIST_ERROR" });

          toast.error("Enter correct town");
        }
        if (Number.parseInt(cod) === 200) {
          dispatch({ type: "SET_DAY_OF_WEATHER", weatherDay: list[0].dt_txt });
          dispatch({ type: "SET_LIST_OF_WEATHER", list, city });
          return { list, city };
        }
      }
    } catch (err) {
      dispatch({ type: "RESET_LIST_OF_WEATHER" });
      dispatch({ type: "RESET_LOADING" });
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
