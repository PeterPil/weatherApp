const initialState = {
  list: [],
  city: "",
  weatherType: "fiveDay"
};

export default function weatherReducer(state = initialState, action) {
  
  switch (action.type) {
    
    case "SET_LIST_OF_WEATHER":
      return {
        ...state,
        list: action.list,
        city: action.city
      };
    case "SET_TYPE_OF_WEATHER":
      return {
        ...state,
        weatherType: action.weatherType
      };
    case "SET_DAY_OF_WEATHER":
      return {
        ...state,
        weatherDay: action.weatherDay
      };
    case "RESET_LIST_OF_WEATHER":
      return {
        ...state,
        list: [],
        city: "",
        weatherType: 'fiveDay'
      };
    default:
      return state;
  }
}
