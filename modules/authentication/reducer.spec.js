import reducer from './reducer';
import {
  VALID_TOKEN_INFO_FIELDS
} from './constants';

const initialState = {
  email: null,
  error: null,
  id: null,
  isActive: false,
  name: null,
  tokenInfo: {},
  uid: null
};

describe('authentication/reducer', function() {
  const testCases = ['REGISTER', 'RESET_PASSWORD', 'SIGN_IN'];

  testCases.forEach(function(testCase) {
    describe(`${testCase}_START`, function() {
      let nextState;
      let previousState;

      beforeEach(function() {
        previousState = {
          avatar: faker.internet.avatar(),
          email: faker.internet.email(),
          error: new Error(),
          id: faker.random.number().toString(),
          isActive: false,
          password: faker.internet.password(),
          name: faker.name.findName(),
          uid: faker.internet.email(),
          tokenInfo: VALID_TOKEN_INFO_FIELDS.reduce((memo, field) => {
            memo[field] = faker.internet.password();
            return memo;
          }, {})
        };
        nextState = reducer(previousState, {
          type: `${testCase}_START`
        });
      });

      it('clears any existing errors', function() {
        expect(nextState.error).to.be.null;
      });

      it('sets the activity state to be true', function() {
        expect(nextState.isActive).to.be.true;
      });

      it('clears any existing user info', function() {
        expect(nextState.email).to.be.null;
        expect(nextState.id).to.be.null;
        expect(nextState.name).to.be.null;
        expect(nextState.uid).to.be.null;
        expect(nextState.tokenInfo).to.deep.equal({});
      });

      it('creates a new object and transfers the old properties', function() {
        expect(nextState).to.not.equal(previousState);
        expect(nextState.avatar).to.equal(previousState.avatar);
        expect(nextState.password).to.equal(previousState.password);
      });
    });

    describe(`${testCase}_SUCCESS`, function() {
      let expectedUserInfo;
      let nextState;
      let previousState;

      beforeEach(function() {
        expectedUserInfo = {
          email: faker.internet.email(),
          id: faker.random.number(),
          name: faker.name.findName(),
          uid: faker.internet.email()
        };

        previousState = {
          avatar: faker.internet.avatar(),
          isActive: true,
          password: faker.internet.password()
        };
        nextState = reducer(previousState, {
          type: `${testCase}_SUCCESS`,
          payload: {
            userInfo: {
              email: expectedUserInfo.email,
              id: expectedUserInfo.id,
              name: expectedUserInfo.name,
              uid: expectedUserInfo.uid
            }
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

      it("sets the user's uid", function() {
        expect(nextState.uid).to.equal(expectedUserInfo.uid);
      });

      it('creates a new object and transfers the old properties', function() {
        expect(nextState).to.not.equal(previousState);
        expect(nextState.avatar).to.equal(previousState.avatar);
        expect(nextState.password).to.equal(previousState.password);
      });
    });

    describe(`${testCase}_FAILURE`, function() {
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
          type: `${testCase}_FAILURE`,
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
  });

  describe('REQUEST_PASSWORD_RESET_START', function() {
    let nextState;
    let previousState;

    beforeEach(function() {
      previousState = {
        avatar: faker.internet.avatar(),
        error: new Error(),
        isActive: false
      };
      nextState = reducer(previousState, {
        type: 'REQUEST_PASSWORD_RESET_START'
      });
    });

    it('clears any existing errors', function() {
      expect(nextState.error).to.be.null;
    });

    it('sets the activity state to be true', function() {
      expect(nextState.isActive).to.be.true;
    });

    it('creates a new object and transfers the old properties', function() {
      expect(nextState).to.not.equal(previousState);
      expect(nextState.avatar).to.equal(previousState.avatar);
    });
  });

  describe('REQUEST_PASSWORD_RESET_SUCCESS', function() {
    let nextState;
    let previousState;

    beforeEach(function() {
      previousState = {
        avatar: faker.internet.avatar(),
        error: new Error(),
        isActive: true
      };
      nextState = reducer(previousState, {
        type: 'REQUEST_PASSWORD_RESET_SUCCESS'
      });
    });

    it('sets the activity state to be false', function() {
      expect(nextState.isActive).to.be.false;
    });

    it('creates a new object and transfers the old properties', function() {
      expect(nextState).to.not.equal(previousState);
      expect(nextState.avatar).to.equal(previousState.avatar);
    });
  });

  describe('REQUEST_PASSWORD_RESET_FAILURE', function() {
    let expectedError;
    let nextState;
    let previousState;

    beforeEach(function() {
      expectedError = new Error();

      previousState = {
        avatar: faker.internet.avatar(),
        error: null,
        isActive: true
      };
      nextState = reducer(previousState, {
        type: 'REQUEST_PASSWORD_RESET_FAILURE',
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
    });
  });

  describe('SIGN_OUT', function() {
    let nextState;
    let previousState;

    beforeEach(function() {
      previousState = {
        avatar: faker.internet.avatar(),
        email: faker.internet.email(),
        id: faker.random.number().toString(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        uid: faker.internet.email(),
        tokenInfo: VALID_TOKEN_INFO_FIELDS.reduce((memo, field) => {
          memo[field] = faker.internet.password();
          return memo;
        }, {})
      };
      nextState = reducer(previousState, {
        type: 'SIGN_OUT'
      });
    });

    it('clears any existing user info', function() {
      expect(nextState.email).to.be.null;
      expect(nextState.id).to.be.null;
      expect(nextState.name).to.be.null;
      expect(nextState.uid).to.be.null;
      expect(nextState.tokenInfo).to.deep.equal({});
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
      expectedTokenInfo = VALID_TOKEN_INFO_FIELDS.reduce((memo, field) => {
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
