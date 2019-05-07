const initialState = {
  isLoading: false,
  isLoadingFetch: false
};

export default function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case "IS_LOADING":
      return {
        ...state,
        isLoading: true
      };
     case "IS_LOADING_FETCH":
      return {
        ...state,
        isLoadingFetch: true
      };
    case "RESET_LOADING":
      return initialState;
    default:
      return state;
  }
}