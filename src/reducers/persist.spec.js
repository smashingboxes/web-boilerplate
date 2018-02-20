import Immutable from 'immutable';
import { REHYDRATE } from 'redux-persist-immutable/constants';

import persistReducer from './persist';

describe('reducers/persist', function() {
  const INITIAL_STATE = Immutable.fromJS({
    rehydrated: false
  });

  describe(REHYDRATE, function() {
    let nextState;

    beforeEach(function() {
      nextState = persistReducer(INITIAL_STATE, {
        type: REHYDRATE
      });
    });

    it('sets rehydration to true', function() {
      expect(nextState.get('rehydrated')).to.be.true;
    });

    it('returns a default initial state', function() {
      nextState = persistReducer(undefined, {});// eslint-disable-line no-undefined

      expect(nextState).to.deep.equal(INITIAL_STATE);
    });
  });
});
