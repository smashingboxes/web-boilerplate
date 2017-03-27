import actionTypes from './actionTypes';

const INITIAL_STATE = {
  isActive: false
};

function authentication(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actionTypes.SIGN_IN_START:
    return {
      ...state,
      error: undefined, // eslint-disable-line no-undefined
      isActive: true
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

  default:
    return state;
  }
}

export default authentication;
