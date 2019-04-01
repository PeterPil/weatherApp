import reducers from '../reducers/index';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import firebase from "../Firebase/firebase";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({firebase}))
    )
);
export default store;
