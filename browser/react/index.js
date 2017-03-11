'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';
import AllPuppiesContainer from './containers/AllPuppiesContainer';
import SinglePuppyContainer from './containers/SinglePuppyContainer';

import {getPuppiesFromServer} from './action-creators/puppies';
import {getPuppyFromServer} from './action-creators/singlepuppy';

/** onEnter hooks for routes */
const onAppEnter = (nextRouterState) => {
  store.dispatch(getPuppiesFromServer());
};

const onSinglePuppyEnter = (nextRouterState) => {
  store.dispatch(getPuppyFromServer(nextRouterState.params.puppyId));
}

/** Routes */
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} onEnter={onAppEnter}>
        <Route path="/puppies" component={AllPuppiesContainer} />
        <Route path="/puppies/:puppyId" component={SinglePuppyContainer} onEnter={onSinglePuppyEnter} />
        <IndexRedirect to="/puppies" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
