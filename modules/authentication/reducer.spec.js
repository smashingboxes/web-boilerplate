import reducer from './reducer';
import {
  validTokenInfoFields
} from './utils';

const initialState = {
  isActive: false,
  tokenInfo: {}
};

describe('authentication/reducer', function() {
  describe('SIGN_IN_START', function() {
    let nextState;
    let previousState;

    beforeEach(function() {
      previousState = {
        avatar: faker.internet.avatar(),
        error: new Error(),
        isActive: false,
        password: faker.internet.password()
      };
      nextState = reducer(previousState, {
        type: 'SIGN_IN_START'
      });
    });

    it('clears any existing errors', function() {
      expect(nextState.error).to.be.undefined;
    });

    it('sets the activity state to be true', function() {
      expect(nextState.isActive).to.be.true;
    });

    it('clears any existing user info', function() {
      expect(nextState.email).to.be.undefined;
      expect(nextState.id).to.be.undefined;
      expect(nextState.name).to.be.undefined;
      expect(nextState.tokenInfo).to.deep.equal({});
    });

    it('creates a new object and transfers the old properties', function() {
      expect(nextState).to.not.equal(previousState);
      expect(nextState.avatar).to.equal(previousState.avatar);
      expect(nextState.password).to.equal(previousState.password);
    });
  });

  describe('SIGN_IN_SUCCESS', function() {
    let expectedUserInfo;
    let nextState;
    let previousState;

    beforeEach(function() {
      expectedUserInfo = {
        email: faker.internet.email(),
        id: faker.random.number(),
        name: faker.name.findName()
      };

      previousState = {
        avatar: faker.internet.avatar(),
        isActive: true,
        password: faker.internet.password()
      };
      nextState = reducer(previousState, {
        type: 'SIGN_IN_SUCCESS',
        payload: {
          email: expectedUserInfo.email,
          id: expectedUserInfo.id,
          name: expectedUserInfo.name
        }
      });
    });

    it("sets the user's email", function() {
      expect(nextState.email).to.equal(expectedUserInfo.email);
    });

    it("sets the user's id", function() {
      expect(nextState.id).to.equal(expectedUserInfo.id);
    });

    it('sets the activity state to be false', function() {
      expect(nextState.isActive).to.false;
    });

    it("sets the user's name", function() {
      expect(nextState.name).to.equal(expectedUserInfo.name);
    });

    it('creates a new object and transfers the old properties', function() {
      expect(nextState).to.not.equal(previousState);
      expect(nextState.avatar).to.equal(previousState.avatar);
      expect(nextState.password).to.equal(previousState.password);
    });
  });

  describe('SIGN_IN_FAILURE', function() {
    let expectedError;
    let nextState;
    let previousState;

    beforeEach(function() {
      expectedError = new Error();

      previousState = {
        avatar: faker.internet.avatar(),
        isActive: true,
        password: faker.internet.password()
      };
      nextState = reducer(previousState, {
        type: 'SIGN_IN_FAILURE',
        error: true,
        payload: expectedError
      });
    });

    it('sets the activity state to be false', function() {
      expect(nextState.isActive).to.be.false;
    });

    it('sets the error message', function() {
      expect(nextState.error).to.equal(expectedError);
    });

    it('creates a new object and transfers the old properties', function() {
      expect(nextState).to.not.equal(previousState);
      expect(nextState.avatar).to.equal(previousState.avatar);
      expect(nextState.password).to.equal(previousState.password);
    });
  });

  describe('UPDATE_TOKEN_INFO', function() {
    let expectedTokenInfo;
    let nextState;
    let previousState;

    beforeEach(function() {
      expectedTokenInfo = validTokenInfoFields.reduce((memo, field) => {
        memo[field] = faker.internet.password();
        return memo;
      }, {});

      previousState = {
        avatar: faker.internet.avatar(),
        isActive: faker.random.boolean(),
        password: faker.internet.password()
      };
      nextState = reducer(previousState, {
        type: 'UPDATE_TOKEN_INFO',
        payload: expectedTokenInfo
      });
    });

    it('sets the new token info', function() {
      expect(nextState.tokenInfo).to.equal(expectedTokenInfo);
    });

    it('creates a new object and transfers the old properties', function() {
      expect(nextState).to.not.equal(previousState);
      expect(nextState.avatar).to.equal(previousState.avatar);
      expect(nextState.isActive).to.equal(previousState.isActive);
      expect(nextState.password).to.equal(previousState.password);
    });
  });

  describe('default', function() {
    let nextState;

    beforeEach(function() {
      nextState = reducer(undefined, {}); // eslint-disable-line no-undefined
    });

    it('returns the initial state', function() {
      expect(nextState).to.deep.equal(initialState);
    });
  });
});
