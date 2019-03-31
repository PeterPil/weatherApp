const initialState = {
  email: '',
  passwordd: '',
  error: null
};

export default function signIn(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return { ...state, error: null };
    case 'SIGN_IN_ERROR':
      return { ...state, error: 'Sign in failed' };
    default:
      return state;
  }
}
