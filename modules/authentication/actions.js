import actionTypes from './actionTypes';
import service from './services';

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
  requestPasswordReset
};
