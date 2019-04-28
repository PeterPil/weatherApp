import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import weatherReducer from './weatherReducer';
import townToFirebaseReducer from './townToFirebaseReducer';
import authReducer from './authReducer';
import userDataReducer from './userDataReducer';

const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  routing: routerReducer,
  userDataReducer,
  weatherReducer,
  townToFirebaseReducer,
  authReducer
  
});

export default reducers;
