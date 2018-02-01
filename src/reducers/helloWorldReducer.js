import actionTypes from '../constants/actionTypes';

const INITIAL_STATE = {
  name: 'World'
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case actionTypes.SET_NAME:
    return {
      ...state,
      name: action.payload.name
    };
  default:
    return state;
  }
}

export default reducer;
