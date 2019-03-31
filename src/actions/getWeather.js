import api from '../api';
import { format } from 'date-fns';

export const fetchWeather = searchParams => {
  return (dispatch, getState) => {
    const params = {
      appid: '228473111bbbe3a150c7076ed8f93d03',
      q: searchParams.searchValue
    };

    return api
      .get('/forecast', { params })
      .then(res => {
        if (res.status < 500) {
          if (searchParams.isDailyWeather) {
            const currentWeather = res.data.list.filter(
              item =>
                format(item.dt_txt, 'dd') ===
                format(res.data.list[0].dt_txt, 'dd')
            );
            console.log(currentWeather);

            return {
              status: res.status,
              list: currentWeather
            };
          }
          const fiveDayWeather = res.data.list.filter(
            item =>
              format(item.dt_txt, 'HH:mm:ss') ===
              format(res.data.list[0].dt_txt, 'HH:mm:ss')
          );
          return {
            status: res.status,
            list: fiveDayWeather
          };
        } else {
          console.log('Server Error!');
          throw res;
        }
      })
      .then(({ status, list }) => {
        console.log(list);
        if (status === 200) {
          return dispatch({ type: 'SET_LIST_OF_WEATHER', list });
        }
      })
      .catch(error => {
        if (
          error.response.status === 403 ||
          error.response.status === 401 ||
          error.response.status === 400
        ) {
          throw error.response.data;
        }
      });
  };
};
