import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import {Router, Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router';

/* -----------------   IMPORTED COMPONENTS   ------------------ */

import Home from './containers/homeContainer';
import App from './components/App';
import singleDetailContainer from './containers/singleDetailContainer';

/* -----------------  THUNK ACTION CREATORS   ------------------ */

import {GetCompanies, settingCurrentCompany} from './action-creators/company';


const fetchInitialData = (nextRouterState) => {
  store.dispatch(GetCompanies());
};

const fetchCurrentCompany = (nextRouterState) => {
  var foundCompany = store.getState().company.companies.filter(function(company){
    return company._id === nextRouterState.params.companyId;
  });
  if (foundCompany.length > 0) {
    store.dispatch(settingCurrentCompany(foundCompany[0]));
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router history = {browserHistory}>
      <Route path = "/" component = {App} onEnter = {fetchInitialData}>
        <IndexRedirect to="companies" />
        <Route path= "/companies" component = {Home} onEnter = {fetchInitialData} />
        <Route path="/companies/:companyId" component = {singleDetailContainer} onEnter = {fetchCurrentCompany} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
