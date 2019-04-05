const initialState = {
    list: [],
    city: '',
    isDailyWeather: true
};

export default function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LIST_OF_WEATHER':
            return {
                ...state,
                list: action.list,
                city: action.city
            };
            case 'SET_TYPE_OF_WEATHER':
            return {
                ...state,
                isDailyWeather: action.isDailyWeather
            };
        case 'RESET_LIST_OF_WEATHER':
            return {
                ...state,
                list: [],
                city: ''
            };
        default:
            return state;
    }
}
