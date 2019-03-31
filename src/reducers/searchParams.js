const initialState = {
  searchValue: '',
  isDailyWeather: true
};

export default function searchParams(state = initialState, action) {
  switch (action.type) {
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.searchValue
      };
    case 'SET_WEATHER_TYPE':
      return {
        ...state,
        isDailyWeather: action.isDailyWeather
      };
    case 'RESET_SEARCH':
      return initialState;
    default:
      return state;
  }
}
