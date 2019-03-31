const initialState = {
  list: []
};

export default function weatherList(state = initialState, action) {
  switch (action.type) {
    case 'SET_LIST_OF_WEATHER':
      return {
        ...state,
        list: action.list
      };
    case 'RESET_LIST_OF_WEATHER':
      return initialState;
    default:
      return state;
  }
}
