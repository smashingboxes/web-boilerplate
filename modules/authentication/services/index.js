import apiService from '../../../src/services/api';
import {
  VALID_TOKEN_INFO_FIELDS
} from '../constants';

function checkAuth(store) {
  return function(nextState, replace, callback) {
    return store.getHydratedState()
      .then((state) => {
        const hasAllTokenInfoKeys = VALID_TOKEN_INFO_FIELDS.filter((field) => {
          return state.authentication.tokenInfo[field];
        }).length === VALID_TOKEN_INFO_FIELDS.length;

        if (!hasAllTokenInfoKeys) {
          throw new Error();
        }

        callback();
      })
      .catch(() => {
        const query = { ...nextState.location.query };

        if (nextState.location.pathname && nextState.location.pathname !== '/') {
          query.next = nextState.location.pathname;
        }

        replace({
          query,
          pathname: '/sign-in'
        });
        callback();
      });
  };
}

function register(credentials) {
  return apiService
    .post('/auth', credentials)
    .then(({ data }) => {
      return {
        email: data.data.email,
        id: data.data.id,
        name: data.data.name
      };
    })
    .catch((err) => {
      let errorMessage = 'There was a problem registering. Please try again.';

      if (err.response.status === 404) {
        errorMessage = 'Could not find user to match given registration id';
      }

      throw new Error(errorMessage);
    });
}

function requestPasswordReset(params) {
  return apiService
    .post('/auth/password', params)
    .then(({ data }) => {
      return {
        response: data.message
      };
    })
    .catch((err) => {
      let errorMessage = 'There was a problem requesting a password reset token.';

      if (err.response.status === 404) {
        errorMessage = `Could not find existing user ${params.email}`;
      }

      throw new Error(errorMessage);
    });
}

function resetPassword(params) {
  return apiService
    .put('/auth/password', params)
    .then(({ data }) => {
      return {
        email: data.email,
        id: data.id,
        name: data.name
      };
    })
    .catch(() => {
      const errorMessage = 'There was a problem reseting your password. Please try again.';
      throw new Error(errorMessage);
    });
}

function signIn(credentials) {
  return apiService
    .post('/auth/sign_in', credentials)
    .then(({ data }) => {
      return {
        email: data.data.email,
        id: data.data.id,
        name: data.data.name,
        uid: data.data.uid
      };
    })
    .catch((err) => {
      let errorMessage = 'There was a problem signing in. Please try again.';

      if (err.response && err.response.status === 401) {
        errorMessage = 'Your credentials could not be verified. Please try again.';
      }

      throw new Error(errorMessage);
    });
}

function signOut() {
  return apiService
    .delete('/auth/sign_out');
}

export default {
  checkAuth,
  register,
  requestPasswordReset,
  resetPassword,
  signIn,
  signOut
};
