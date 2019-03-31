import reducers from '../reducers/index';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {getFirestore, reduxFirestore} from 'redux-firestore';
import {getFirebase, reduxFirebase} from 'react-redux-firebase';
import fbConfig from "../Firebase/fbConfig";
import firebase from "../Firebase/firebase";
import rrfConfig from "../Firebase/rrfConfig";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
    reducers,
    composeEnhancers(
        // reduxFirebase(firestore, rrfConfig),
        // reduxFirestore(firestore),
        applyMiddleware(thunk.withExtraArgument({firebase}))
    )
);
console.log(getFirebase);
export default store;
