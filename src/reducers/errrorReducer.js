const initialState = {
  isError: false,
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_WEATHER_LIST_ERROR":
      return {
        ...state,
        isError: true
      };
    case "RESET_ERROR":
      return initialState;
    default:
      return state;
  }
}