import firebase from './firebase';
import store from '../store/store';
import {createFirestoreInstance} from 'redux-firestore';
import rrfConfig from './rrfConfig';
import {createFirebaseInstance} from "react-redux-firebase";

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

export default rrfProps;
