import faker from 'faker';

import * as actions from './helloWorldActions';

describe('Hello World Actions', () => {
  describe('#setName', () => {
    it('should return an action to set the name', () => {
      const name = faker.name.firstName();
      expect(actions.setName(name)).to.eql({
        type: 'SET_NAME',
        payload: { name }
      });
    });
  });
});
