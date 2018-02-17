import React from 'react';
import PropTypes from 'prop-types';
import {
  browserHistory as history,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import AppContainer from '../containers/AppContainer';
import ForgotPassword from '../../modules/authentication/containers/ForgotPassword';
import Register from '../../modules/authentication/containers/Register';
import RegistrationConfirmed from '../../modules/authentication/containers/RegistrationConfirmed';
import ResetPassword from '../../modules/authentication/containers/ResetPassword';
import SignIn from '../../modules/authentication/containers/SignIn';
import authenticationService from '../../modules/authentication/services';
import routes from '../constants/routes';

const propTypes = {
  store: PropTypes.object.isRequired
};

function Routes({ store }) {
  return (
    <Router history={history}>
      <Route path={routes.ROOT} onEnter={authenticationService.checkAuth(store)}>
        <IndexRoute component={AppContainer} />
      </Route>
      <Route path={routes.AUTHENTICATION.FORGOT_PASSWORD} component={ForgotPassword} />
      <Route path={routes.AUTHENTICATION.REGISTER} component={Register} />
      <Route
        path={routes.AUTHENTICATION.REGISTRATION_CONFIRMED}
        component={RegistrationConfirmed}
        onEnter={(nextState, replace, callback) => {
          return authenticationService.prehydrateStore(store)(null, null, callback);
        }}
      />
      <Route path={routes.AUTHENTICATION.RESET_PASSWORD} component={ResetPassword} />
      <Route path={routes.AUTHENTICATION.SIGN_IN} component={SignIn} />
    </Router>
  );
}

Routes.propTypes = propTypes;

export default Routes;
