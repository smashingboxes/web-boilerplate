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

function resetPasswordStart() {
  return {
    type: actionTypes.RESET_PASSWORD_START
  };
}

function resetPasswordSuccess(userInfo) {
  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS,
    payload: { userInfo }
  };
}

function resetPasswordFailure(err) {
  return {
    type: actionTypes.RESET_PASSWORD_FAILURE,
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

function requestPasswordReset(credentials) {
  return function(dispatch) {
    dispatch(requestPasswordResetStart());

    return service
      .requestPasswordReset(credentials)
      .then(() => dispatch(requestPasswordResetSuccess()))
      .catch((err) => {
        dispatch(requestPasswordResetFailure(err));
        throw err;
      });
  };
}

function resetPassword(credentials) {
  return function(dispatch) {
    dispatch(resetPasswordStart());

    return service
      .resetPassword(credentials)
      .then((userInfo) => dispatch(resetPasswordSuccess(userInfo)))
      .catch((err) => {
        dispatch(resetPasswordFailure(err));
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

function signOut() {
  const signOutAction = {
    type: actionTypes.SIGN_OUT
  };

  return function(dispatch) {
    return service
      .signOut()
      .then(() => dispatch(signOutAction))
      .catch(() => dispatch(signOutAction));
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
  resetPassword,
  signIn,
  signOut,
  updateTokenInfo
};
