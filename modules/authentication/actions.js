import actionTypes from './constants/actionTypes';
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

function signInStart() {
  return {
    type: actionTypes.SIGN_IN_START
  };
}

function signInSuccess(userInfo) {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: { userInfo }
  };
}

function signInFailure(err) {
  return {
    type: actionTypes.SIGN_IN_FAILURE,
    error: true,
    payload: err
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

function signIn(credentials) {
  return function(dispatch) {
    dispatch(signInStart());

    return service
      .signIn(credentials)
      .then((userInfo) => dispatch(signInSuccess(userInfo)))
      .catch((err) => {
        dispatch(signInFailure(err));
        throw err;
      });
  };
}

function updateTokenInfo(tokenInfo) {
  return {
    type: actionTypes.UPDATE_TOKEN_INFO,
    payload: tokenInfo
  };
}

export {
  register,
  requestPasswordReset,
  signIn,
  updateTokenInfo
};
