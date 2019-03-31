import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import weatherList from './getWeather';
import searchParams from './searchParams';
import listOfTown from './listOfTown';
import signIn from './signIn';

const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  routing: routerReducer,
  weatherList,
  searchParams,
  listOfTown,
  signIn
});

export default reducers;
