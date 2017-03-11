import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { connect } from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

/* -----------------   IMPORTED COMPONENTS   ------------------ */

import Home from './containers/homeContainer';
import App from './components/App';
import singleDetailContainer from './containers/singleDetailContainer';

/* -----------------  THUNK ACTION CREATORS   ------------------ */

import {GetCompanies} from './action-creators/company';


const fetchInitialData = (nextRouterState) => {
  store.dispatch(GetCompanies());
};

console.log(Home);
console.log(App);
console.log(singleDetailContainer);

ReactDOM.render(
  <Provider store={store}>
    <Router history = {browserHistory}>
      <Route path = "/" component = {App} onEnter = {fetchInitialData}>
        <IndexRoute component = {Home} />
        <Route path="/:companyId" component = {singleDetailContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
