import Immutable from 'immutable';
import reducer from './reducer';
import {
  VALID_TOKEN_INFO_FIELDS
} from './constants';

const initialState = Immutable.fromJS({
  email: null,
  error: null,
  id: null,
  isActive: false,
  name: null,
  tokenInfo: {},
  uid: null
});

describe('authentication/reducer', function() {
  ['CLEAR_HEADERS', 'SIGN_OUT'].forEach(function(testCase) {
    describe(testCase, function() {
      let nextState;
      let previousState;

      beforeEach(function() {
        previousState = Immutable.fromJS({
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
        });
        nextState = reducer(previousState, {
          type: testCase
        });
      });

      it('clears any existing user info', function() {
        expect(nextState.get('email')).to.be.null;
        expect(nextState.get('id')).to.be.null;
        expect(nextState.get('name')).to.be.null;
        expect(nextState.get('uid')).to.be.null;
        expect(nextState.get('tokenInfo')).to.deep.equal(Immutable.fromJS({}));
      });

      it('creates a new object and transfers the old properties', function() {
        expect(nextState).to.not.deep.equal(previousState);
        expect(nextState.get('avatar')).to.equal(previousState.get('avatar'));
        expect(nextState.get('password')).to.equal(previousState.get('password'));
      });
    });
  });

  ['REGISTER', 'RESET_PASSWORD', 'SIGN_IN'].forEach(function(testCase) {
    describe(`${testCase}_START`, function() {
      let nextState;
      let previousState;

      beforeEach(function() {
        previousState = Immutable.fromJS({
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
        });
        nextState = reducer(previousState, {
          type: `${testCase}_START`
        });
      });

      it('clears any existing errors', function() {
        expect(nextState.get('error')).to.be.null;
      });

      it('sets the activity state to be true', function() {
        expect(nextState.get('isActive')).to.be.true;
      });

      it('clears any existing user info', function() {
        expect(nextState.get('email')).to.be.null;
        expect(nextState.get('id')).to.be.null;
        expect(nextState.get('name')).to.be.null;
        expect(nextState.get('uid')).to.be.null;
        expect(nextState.get('tokenInfo')).to.deep.equal(Immutable.fromJS({}));
      });

      it('creates a new object and transfers the old properties', function() {
        expect(nextState).to.not.deep.equal(previousState);
        expect(nextState.get('avatar')).to.equal(previousState.get('avatar'));
        expect(nextState.get('password')).to.equal(previousState.get('password'));
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

        previousState = Immutable.fromJS({
          avatar: faker.internet.avatar(),
          isActive: true,
          password: faker.internet.password()
        });
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
        expect(nextState.get('email')).to.equal(expectedUserInfo.email);
      });

      it("sets the user's id", function() {
        expect(nextState.get('id')).to.equal(expectedUserInfo.id);
      });

      it('sets the activity state to be false', function() {
        expect(nextState.get('isActive')).to.false;
      });

      it("sets the user's name", function() {
        expect(nextState.get('name')).to.equal(expectedUserInfo.name);
      });

      it("sets the user's uid", function() {
        expect(nextState.get('uid')).to.equal(expectedUserInfo.uid);
      });

      it('creates a new object and transfers the old properties', function() {
        expect(nextState).to.not.deep.equal(previousState);
        expect(nextState.get('avatar')).to.equal(previousState.get('avatar'));
        expect(nextState.get('password')).to.equal(previousState.get('password'));
      });
    });

    describe(`${testCase}_FAILURE`, function() {
      let expectedError;
      let nextState;
      let previousState;

      beforeEach(function() {
        expectedError = new Error();

        previousState = Immutable.fromJS({
          avatar: faker.internet.avatar(),
          isActive: true,
          password: faker.internet.password()
        });
        nextState = reducer(previousState, {
          type: `${testCase}_FAILURE`,
          error: true,
          payload: expectedError
        });
      });

      it('sets the activity state to be false', function() {
        expect(nextState.get('isActive')).to.be.false;
      });

      it('sets the error message', function() {
        expect(nextState.get('error')).to.equal(expectedError);
      });

      it('creates a new object and transfers the old properties', function() {
        expect(nextState).to.not.deep.equal(previousState);
        expect(nextState.get('avatar')).to.equal(previousState.get('avatar'));
        expect(nextState.get('password')).to.equal(previousState.get('password'));
      });
    });
  });

  describe('REQUEST_PASSWORD_RESET_START', function() {
    let nextState;
    let previousState;

    beforeEach(function() {
      previousState = Immutable.fromJS({
        avatar: faker.internet.avatar(),
        error: new Error(),
        isActive: false
      });
      nextState = reducer(previousState, {
        type: 'REQUEST_PASSWORD_RESET_START'
      });
    });

    it('clears any existing errors', function() {
      expect(nextState.get('error')).to.be.null;
    });

    it('sets the activity state to be true', function() {
      expect(nextState.get('isActive')).to.be.true;
    });

    it('creates a new object and transfers the old properties', function() {
      expect(nextState).to.not.deep.equal(previousState);
      expect(nextState.get('avatar')).to.equal(previousState.get('avatar'));
    });
  });

  describe('REQUEST_PASSWORD_RESET_SUCCESS', function() {
    let nextState;
    let previousState;

    beforeEach(function() {
      previousState = Immutable.fromJS({
        avatar: faker.internet.avatar(),
        error: new Error(),
        isActive: true
      });
      nextState = reducer(previousState, {
        type: 'REQUEST_PASSWORD_RESET_SUCCESS'
      });
    });

    it('sets the activity state to be false', function() {
      expect(nextState.get('isActive')).to.be.false;
    });

    it('creates a new object and transfers the old properties', function() {
      expect(nextState).to.not.deep.equal(previousState);
      expect(nextState.get('avatar')).to.equal(previousState.get('avatar'));
    });
  });

  describe('REQUEST_PASSWORD_RESET_FAILURE', function() {
    let expectedError;
    let nextState;
    let previousState;

    beforeEach(function() {
      expectedError = new Error();

      previousState = Immutable.fromJS({
        avatar: faker.internet.avatar(),
        error: null,
        isActive: true
      });
      nextState = reducer(previousState, {
        type: 'REQUEST_PASSWORD_RESET_FAILURE',
        error: true,
        payload: expectedError
      });
    });

    it('sets the activity state to be false', function() {
      expect(nextState.get('isActive')).to.be.false;
    });

    it('sets the error message', function() {
      expect(nextState.get('error')).to.equal(expectedError);
    });

    it('creates a new object and transfers the old properties', function() {
      expect(nextState).to.not.equal(previousState);
      expect(nextState.get('avatar')).to.equal(previousState.get('avatar'));
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

      previousState = Immutable.fromJS({
        avatar: faker.internet.avatar(),
        isActive: faker.random.boolean(),
        password: faker.internet.password()
      });
      nextState = reducer(previousState, {
        type: 'UPDATE_TOKEN_INFO',
        payload: expectedTokenInfo
      });
    });

    it('sets the new token info', function() {
      expect(nextState.get('tokenInfo')).to.equal(Immutable.fromJS(expectedTokenInfo));
    });

    it('creates a new object and transfers the old properties', function() {
      expect(nextState).to.not.deep.equal(previousState);
      expect(nextState.get('avatar')).to.equal(previousState.get('avatar'));
      expect(nextState.get('isActive')).to.equal(previousState.get('isActive'));
      expect(nextState.get('password')).to.equal(previousState.get('password'));
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
