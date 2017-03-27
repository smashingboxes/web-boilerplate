import reducer from './reducer';

const initialState = {
  isActive: false
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
