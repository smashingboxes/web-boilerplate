import React from 'react';
import {
  browserHistory as history,
  Route,
  Router
} from 'react-router';
import AppContainer from './containers/AppContainer';
import SignIn from '../modules/authentication/containers/SignIn';

function Routes() {
  return (
    <Router history={history}>
      <Route path="/" component={AppContainer} />
      <Route path="/sign-in" component={SignIn} />
    </Router>
  );
}

export default Routes;
