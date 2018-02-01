import helloWorldReducer from './helloWorldReducer';
import actionTypes from '../constants/actionTypes';

describe('helloWorldReducer', function() {
  const INITIAL_STATE = { name: 'World' };

  it('defaults to returning the initial state', function() {
    expect(helloWorldReducer(undefined, {})).to.eql(INITIAL_STATE); // eslint-disable-line no-undefined
  });

  it('handles bogus actions with ease', function() {
    const bogusAction = {
      type: 'BOGUS',
      payload: { fakeData: 1234 }
    };
    expect(helloWorldReducer(INITIAL_STATE, bogusAction)).to.eql(INITIAL_STATE);
  });

  describe('SET_NAME action', function() {
    const name = faker.name.firstName();
    const action = {
      type: actionTypes.SET_NAME,
      payload: { name }
    };
    const expected = { name };

    it('sets the name', function() {
      expect(helloWorldReducer(INITIAL_STATE, action)).to.eql(expected);
    });
  });
});
