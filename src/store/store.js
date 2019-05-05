import reducers from "../reducers/index";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import firebase from "../Firebase/firebase";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";

const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({ firebase })))
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }),
  1000
);
export default store;
