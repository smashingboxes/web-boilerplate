import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Router,
  Switch
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AppContainer from '../containers/AppContainer';
import ForgotPassword from '../../modules/authentication/containers/ForgotPassword';
import Register from '../../modules/authentication/containers/Register';
// import RegistrationConfirmed from '../../modules/authentication/containers/RegistrationConfirmed';
import ResetPassword from '../../modules/authentication/containers/ResetPassword';
import SignIn from '../../modules/authentication/containers/SignIn';
// import authenticationService from '../../modules/authentication/services';
import routes from '../constants/routes';
import AuthorizedRoute from './AuthorizedRoute';

const history = createBrowserHistory();

const propTypes = {
  store: PropTypes.object.isRequired
};

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path={routes.AUTHENTICATION.REGISTER} component={Register} />
        <Route path={routes.AUTHENTICATION.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route path={routes.AUTHENTICATION.RESET_PASSWORD} component={ResetPassword} />
        <Route path={routes.AUTHENTICATION.SIGN_IN} component={SignIn} />
        <AuthorizedRoute exact path="/" component={AppContainer} />
      </Switch>
    </Router>
  );
}

Routes.propTypes = propTypes;

export default Routes;
