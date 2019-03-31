import React, { Component } from 'react';
import { Route, Router } from 'react-router';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import history from './components/history';
import Weather from './components/Weather';
import store from './store/store';
import { Provider } from 'react-redux';
import rrfProps from './Firebase/rrfProps';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router history={history}>
            <Route path="/" component={Weather} />
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
