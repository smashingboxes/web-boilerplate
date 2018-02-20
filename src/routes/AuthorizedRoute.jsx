import React from 'react';
import PropTypes from 'prop-types';
import {
  Redirect,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';

import isUserAuthorized from '../selectors/isUserAuthorized';
import routes from '../constants/routes';

const propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  hydrated: PropTypes.bool.isRequired,
  isApproved: PropTypes.bool,
  isAuthorized: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

function AuthorizedRoute(props) {
  const {
    component: Component,
    exact,
    hydrated,
    isAuthorized,
    location,
    path
  } = props;

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return isAuthorized ?
          <Component {...routeProps} /> :
          <Redirect
            to={{
              pathname: routes.AUTHENTICATION.SIGN_IN,
              search: location.search,
              state: { from: location.pathname }
            }}
          />;
      }}
    />
  );
}

AuthorizedRoute.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    hydrated: state.getIn(['persist', 'rehydrated']),
    isAuthorized: isUserAuthorized(state)
  };
}

export default connect(mapStateToProps)(AuthorizedRoute);
