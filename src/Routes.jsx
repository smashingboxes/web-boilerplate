import React from 'react';
import { Route, Router, browserHistory as history } from 'react-router';
import AppContainer from './containers/AppContainer';

function Routes() {
  return (
    <Router history={history}>
      <Route path="/" component={AppContainer} />
    </Router>
  );
}

export default Routes;
