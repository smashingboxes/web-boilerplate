import Immutable from 'immutable';
import { REHYDRATE } from 'redux-persist-immutable/constants';

const INITIAL_STATE = Immutable.fromJS({
  rehydrated: false
});

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REHYDRATE:
    return state.set('rehydrated', true);
  default:
    return state;
  }
}

export default reducer;
