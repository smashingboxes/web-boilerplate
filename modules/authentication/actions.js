import actionTypes from './actionTypes';
import service from './services';

function registerStart() {
  return {
    type: actionTypes.REGISTER_START
  };
}

function registerSuccess(authenticationInfo) {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload: { authenticationInfo }
  };
}

function registerFailure(err) {
  return {
    type: actionTypes.REGISTER_FAILURE,
    error: true,
    payload: err
  };
}

function requestPasswordResetStart() {
  return {
    type: actionTypes.REQUEST_PASSWORD_RESET_START
  };
}

function requestPasswordResetSuccess() {
  return {
    type: actionTypes.REQUEST_PASSWORD_RESET_SUCCESS
  };
}

function requestPasswordResetFailure(err) {
  return {
    type: actionTypes.REQUEST_PASSWORD_RESET_FAILURE,
    error: true,
    payload: err
  };
}

function register(credentials) {
  return function(dispatch) {
    dispatch(registerStart());

    return service
      .register(credentials)
      .then((authenticationInfo) => dispatch(registerSuccess(authenticationInfo)))
      .catch((err) => {
        dispatch(registerFailure(err));
        throw err;
      });
  };
}

function requestPasswordReset(params) {
  return function(dispatch) {
    dispatch(requestPasswordResetStart());

    return service
      .requestPasswordReset(params)
      .then(() => dispatch(requestPasswordResetSuccess()))
      .catch((err) => {
        dispatch(requestPasswordResetFailure(err));
        throw err;
      });
  };
}

export {
  register,
  requestPasswordReset
};
