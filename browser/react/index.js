import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { connect } from 'react-redux';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';

/* -----------------   IMPORTED COMPONENTS   ------------------ */

import Home from './containers/homeContainer';
import App from './components/App';
import singleDetailContainer from './containers/singleDetailContainer';

/* -----------------  THUNK ACTION CREATORS   ------------------ */

import {GetCompanies} from './action-creators/company';


const fetchInitialData = (nextRouterState) => {
  store.dispatch(GetCompanies());
};

ReactDOM.render(
  <Provider store={store}>
    <Router history = {browserHistory}>
      <Route path = "/" component = {App} onEnter = {fetchInitialData}>
        <IndexRedirect to="companies" />
        <Route path= "/companies" component = {Home} onEnter = {fetchInitialData} />
        <Route path="/companies/:companyId" component = {singleDetailContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
