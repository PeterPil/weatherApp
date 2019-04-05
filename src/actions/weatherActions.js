import api from '../api';
import { transliterate as tr } from 'transliteration';

export const fetchWeather = searchValue => {
    return (dispatch, getState) => {
        const params = {
            appid: '228473111bbbe3a150c7076ed8f93d03',
            q: tr(searchValue)
        };

        return api
            .get('/forecast', {params})
            .then(res => {
                console.log(res);
                if (res.status < 500) {

                    return {
                        status: res.status,
                        list: res.data.list,
                        city: res.data.city
                    };
                } else {
                    console.log('Server Error!');
                    throw res;
                }
            })
            .then(({status, list, city}) => {
                // console.log(list);
                if (status === 200) {

                    console.log(list);
                    return dispatch({type: 'SET_LIST_OF_WEATHER', list, city});
                }
            })
            .catch(error => {
                dispatch({type: 'RESET_LIST_OF_WEATHER'});
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


export const setWeatherType = ( weatherType ) => {
    return dispatch => dispatch({type: 'SET_TYPE_OF_WEATHER', isDailyWeather: weatherType})
};


