import faker from 'faker';

import * as actions from './helloWorldActions';
import actionTypes from '../constants/actionTypes';

describe('Hello World Actions', () => {
  describe('#setName', () => {
    it('should return an action to set the name', () => {
      const name = faker.name.firstName();
      expect(actions.setName(name)).to.eql({
        type: actionTypes.SET_NAME,
        payload: { name }
      });
    });
  });
});
