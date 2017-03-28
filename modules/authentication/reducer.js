import actionTypes from './actionTypes';

const INITIAL_STATE = {
  isActive: false,
  tokenInfo: {}
};

function authentication(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actionTypes.SIGN_IN_START:
    return {
      ...state,
      email: undefined, // eslint-disable-line no-undefined
      error: undefined, // eslint-disable-line no-undefined
      id: undefined, // eslint-disable-line no-undefined
      isActive: true,
      name: undefined, // eslint-disable-line no-undefined
      tokenInfo: {}
    };

  case actionTypes.SIGN_IN_SUCCESS:
    return {
      ...state,
      email: action.payload.email,
      id: action.payload.id,
      isActive: false,
      name: action.payload.name
    };

  case actionTypes.SIGN_IN_FAILURE:
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
