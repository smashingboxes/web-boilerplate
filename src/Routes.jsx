import React, {
  PropTypes
} from 'react';
import {
  browserHistory as history,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import AppContainer from './containers/AppContainer';
import ForgotPassword from '../modules/authentication/containers/ForgotPassword';
import Register from '../modules/authentication/containers/Register';
import RegistrationConfirmed from '../modules/authentication/containers/RegistrationConfirmed';
import ResetPassword from '../modules/authentication/containers/ResetPassword';
import SignIn from '../modules/authentication/containers/SignIn';
import authenticationService from '../modules/authentication/services';

const propTypes = {
  store: PropTypes.object.isRequired
};

function Routes({ store }) {
  return (
    <Router history={history}>
      <Route path="/" onEnter={authenticationService.checkAuth(store)}>
        <IndexRoute component={AppContainer} />
      </Route>
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/register" component={Register} />
      <Route
        path="/registration-confirmed"
        component={RegistrationConfirmed}
        onEnter={(nextState, replace, callback) => {
          return authenticationService.prehydrateStore(store)(null, null, callback);
        }}
      />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/sign-in" component={SignIn} />
    </Router>
  );
}

Routes.propTypes = propTypes;

export default Routes;
