import Immutable from 'immutable';
import actionTypes from '../constants/actionTypes';

const INITIAL_STATE = Immutable.fromJS({
  name: 'World'
});

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actionTypes.SET_NAME:
    return state.set('name', action.payload.name);
  default:
    return state;
  }
}

export default reducer;
