import actionTypes from './constants/actionTypes';

const INITIAL_STATE = {
  email: null,
  error: null,
  id: null,
  isActive: false,
  name: null,
  uid: null,
  tokenInfo: {}
};

function authentication(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actionTypes.CLEAR_HEADERS:
  case actionTypes.SIGN_OUT:
    return {
      ...state,
      email: null,
      id: null,
      name: null,
      uid: null,
      tokenInfo: {}
    };

  case actionTypes.REGISTER_START:
  case actionTypes.RESET_PASSWORD_START:
  case actionTypes.SIGN_IN_START:
    return {
      ...state,
      email: null,
      error: null,
      id: null,
      isActive: true,
      name: null,
      uid: null,
      tokenInfo: {}
    };

  case actionTypes.REGISTER_SUCCESS:
  case actionTypes.RESET_PASSWORD_SUCCESS:
  case actionTypes.SIGN_IN_SUCCESS:
    return {
      ...state,
      email: action.payload.userInfo.email,
      id: action.payload.userInfo.id,
      isActive: false,
      name: action.payload.userInfo.name,
      uid: action.payload.userInfo.uid
    };

  case actionTypes.REGISTER_FAILURE:
  case actionTypes.RESET_PASSWORD_FAILURE:
  case actionTypes.SIGN_IN_FAILURE:
    return {
      ...state,
      error: action.payload,
      isActive: false
    };

  case actionTypes.REQUEST_PASSWORD_RESET_START:
    return {
      ...state,
      error: null,
      isActive: true
    };

  case actionTypes.REQUEST_PASSWORD_RESET_SUCCESS:
    return {
      ...state,
      isActive: false
    };

  case actionTypes.REQUEST_PASSWORD_RESET_FAILURE:
    return {
      ...state,
      error: action.payload,
      isActive: false
    };

  case actionTypes.UPDATE_TOKEN_INFO:
    return {
      ...state,
      tokenInfo: action.payload
    };

  default:
    return state;
  }
}

export default authentication;
