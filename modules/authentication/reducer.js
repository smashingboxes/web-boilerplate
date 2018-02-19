import Immutable from 'immutable';
import actionTypes from './constants/actionTypes';

const INITIAL_STATE = Immutable.fromJS({
  email: null,
  error: null,
  id: null,
  isActive: false,
  name: null,
  uid: null,
  tokenInfo: {}
});

function authentication(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actionTypes.CLEAR_HEADERS:
  case actionTypes.SIGN_OUT:
    return state.withMutations((map) => {
      map.set('email', null);
      map.set('error', null);
      map.set('id', null);
      map.set('isActive', false);
      map.set('name', null);
      map.set('uid', null);
      map.set('tokenInfo', Immutable.fromJS({}));
    });

  case actionTypes.REGISTER_START:
  case actionTypes.RESET_PASSWORD_START:
  case actionTypes.SIGN_IN_START:
    return state.withMutations((map) => {
      map.set('email', null);
      map.set('error', null);
      map.set('id', null);
      map.set('isActive', true);
      map.set('name', null);
      map.set('uid', null);
      map.set('tokenInfo', Immutable.fromJS({}));
    });

  case actionTypes.REGISTER_SUCCESS:
  case actionTypes.RESET_PASSWORD_SUCCESS:
  case actionTypes.SIGN_IN_SUCCESS:
    return state.withMutations((map) => {
      map.set('email', action.payload.userInfo.email);
      map.set('id', action.payload.userInfo.id);
      map.set('isActive', false);
      map.set('name', action.payload.userInfo.name);
      map.set('uid', action.payload.userInfo.uid);
    });

  case actionTypes.REGISTER_FAILURE:
  case actionTypes.RESET_PASSWORD_FAILURE:
  case actionTypes.SIGN_IN_FAILURE:
    return state.withMutations((map) => {
      map.set('error', action.payload);
      map.set('isActive', false);
    });

  case actionTypes.REQUEST_PASSWORD_RESET_START:
    return state.withMutations((map) => {
      map.set('error', null);
      map.set('isActive', true);
      map.set('tokenInfo', Immutable.fromJS({}));
    });

  case actionTypes.REQUEST_PASSWORD_RESET_SUCCESS:
    return state.withMutations((map) => {
      map.set('isActive', false);
    });

  case actionTypes.REQUEST_PASSWORD_RESET_FAILURE:
    return state.withMutations((map) => {
      map.set('error', action.payload);
      map.set('isActive', false);
    });

  case actionTypes.UPDATE_TOKEN_INFO:
    return state.withMutations((map) => {
      map.set('tokenInfo', Immutable.fromJS(action.payload));
    });

  default:
    return state;
  }
}

export default authentication;
