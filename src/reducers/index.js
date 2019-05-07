import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import weatherReducer from "./weatherReducer";
import loaderReducer from "./loaderReducer";

const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  routing: routerReducer,
  weatherReducer,
  loaderReducer
});

export default reducers;
