const initialState = {
  errorIn: null,
  errorOut: null,
  errorReg: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGN_IN_SUCCESS":
      return { ...state, errorIn: null };
    case "SIGN_IN_ERROR":
      return { ...state, errorIn: action.errorIn };
    case "SIGN_OUT_SUCCESS":
      return { ...state, errorOut: null };
    case "SIGN_OUT_ERROR":
      return { ...state, errorOut: action.errorOut };
    case "REGISTRATION_SUCCESS":
      return { ...state, errorReg: null };
    case "REGISTRATION_ERROR":
      return { ...state, errorReg: action.errorReg };
    default:
      return state;
  }
}
