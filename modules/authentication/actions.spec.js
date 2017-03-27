import * as actions from './actions';
import service from './services';

describe('authentication/actions', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('register', function() {
    context('a successful request', function() {
      let dispatch;
      let expectedAuthenticationInfo;
      let expectedCredentials;
      let expectedEmail;
      let expectedName;
      let expectedPassword;
      let promise;
      let register;

      beforeEach(function() {
        expectedName = faker.name.findName();
        expectedEmail = faker.internet.email();
        expectedPassword = faker.internet.password();
        expectedCredentials = {
          email: expectedEmail,
          password: expectedPassword,
          name: expectedName
        };
        expectedAuthenticationInfo = {
          email: expectedEmail,
          name: expectedName
        };
        dispatch = this.sandbox.stub();
        register = this.sandbox.stub(service, 'register', () => {
          return Promise.resolve(expectedAuthenticationInfo);
        });
        promise = actions.register(expectedCredentials)(dispatch);
      });

      it('dispatches a reset password start action', function() {
        expect(dispatch.calledOnce).to.be.true;
        const [action] = dispatch.firstCall.args;
        expect(action).to.deep.equal({
          type: 'REGISTER_START'
        });
      });

      it('registers the invited user', function() {
        expect(register.calledOnce).to.be.true;
        const [credentials] = register.firstCall.args;
        expect(credentials).to.equal(expectedCredentials);
      });

      it('dispatches a register success action', function() {
        return promise.then(() => {
          expect(dispatch.calledTwice).to.be.true;
          const [action] = dispatch.secondCall.args;
          expect(action).to.deep.equal({
            type: 'REGISTER_SUCCESS',
            payload: {
              authenticationInfo: expectedAuthenticationInfo
            }
          });
        });
      });
    });

    context('a failed request', function() {
      let expectedError;
      let dispatch;
      let promise;

      beforeEach(function() {
        expectedError = new Error();
        dispatch = this.sandbox.stub();
        this.sandbox.stub(service, 'register', () => Promise.reject(expectedError));
        promise = actions.register()(dispatch);
      });

      it('dispatches a register failure action', function() {
        return promise
          .then(expect.fail)
          .catch(() => {
            expect(dispatch.calledTwice).to.be.true;
            const [action] = dispatch.secondCall.args;
            expect(action).to.deep.equal({
              type: 'REGISTER_FAILURE',
              error: true,
              payload: expectedError
            });
          });
      });

      it('throws the error down the promise chain', function() {
        return promise
          .then(expect.fail)
          .catch((err) => {
            expect(err).to.equal(expectedError);
          });
      });
    });
  });

  describe('requestPasswordReset', function() {
    context('a successful request', function() {
      let expectedEmail;
      let dispatch;
      let promise;
      let requestPasswordReset;

      beforeEach(function() {
        expectedEmail = faker.internet.email();
        dispatch = this.sandbox.stub();
        requestPasswordReset = this.sandbox.stub(service, 'requestPasswordReset', () => {
          return Promise.resolve();
        });
        promise = actions.requestPasswordReset(expectedEmail)(dispatch);
      });

      it('dispatches a request token start action', function() {
        expect(dispatch.calledOnce).to.be.true;
        const [action] = dispatch.firstCall.args;
        expect(action).to.deep.equal({
          type: 'REQUEST_PASSWORD_RESET_START'
        });
      });

      it('requests a token', function() {
        expect(requestPasswordReset.calledOnce).to.be.true;
        const [email] = requestPasswordReset.firstCall.args;
        expect(email).to.equal(expectedEmail);
      });

      it('dispatches a request token success action', function() {
        return promise.then(() => {
          expect(dispatch.calledTwice).to.be.true;
          const [action] = dispatch.secondCall.args;
          expect(action).to.deep.equal({
            type: 'REQUEST_PASSWORD_RESET_SUCCESS'
          });
        });
      });
    });

    context('a failed request', function() {
      const expectedEmail = faker.internet.email();
      const expectedError = new Error();
      let dispatch;
      let promise;

      beforeEach(function() {
        dispatch = this.sandbox.stub();
        this.sandbox.stub(service, 'requestPasswordReset').returns(Promise.reject(expectedError));
        promise = actions.requestPasswordReset(expectedEmail)(dispatch);
      });

      it('dispatches a request reset token failure action', function() {
        return promise
          .then(expect.fail)
          .catch(() => {
            expect(dispatch.calledTwice).to.be.true;
            const [action] = dispatch.secondCall.args;
            expect(action).to.deep.equal({
              type: 'REQUEST_PASSWORD_RESET_FAILURE',
              error: true,
              payload: expectedError
            });
          });
      });

      it('throws the error down the promise chain', function() {
        return promise
          .then(expect.fail)
          .catch((err) => {
            expect(err).to.equal(expectedError);
          });
      });
    });
  });

  describe('signIn', function() {
    context('a successful request', function() {
      let dispatch;
      let expectedCredentials;
      let expectedUserInfo;
      let promise;
      let signIn;

      beforeEach(function() {
        expectedUserInfo = {
          email: faker.internet.email(),
          id: faker.random.number(),
          name: faker.name.findName(),
          password: faker.internet.password()
        };
        expectedCredentials = {
          email: expectedUserInfo.email,
          password: expectedUserInfo.password
        };

        dispatch = this.sandbox.stub();
        signIn = this.sandbox.stub(service, 'signIn', () => {
          return Promise.resolve({
            email: expectedUserInfo.email,
            id: expectedUserInfo.id,
            name: expectedUserInfo.name
          });
        });
        promise = actions.signIn(expectedCredentials)(dispatch);
      });

      it('dispatches a sign in start action', function() {
        expect(dispatch.calledOnce).to.be.true;
        const [action] = dispatch.firstCall.args;
        expect(action).to.deep.equal({
          type: 'SIGN_IN_START'
        });
      });

      it('signs the user in', function() {
        expect(signIn.calledOnce).to.be.true;
        const [credentials] = signIn.firstCall.args;
        expect(credentials).to.equal(expectedCredentials);
      });

      it('dispatches a sign in success action', function() {
        return promise.then(() => {
          expect(dispatch.calledTwice).to.be.true;
          const [action] = dispatch.secondCall.args;
          expect(action).to.deep.equal({
            type: 'SIGN_IN_SUCCESS',
            payload: {
              email: expectedUserInfo.email,
              id: expectedUserInfo.id,
              name: expectedUserInfo.name
            }
          });
        });
      });
    });

    context('a failed request', function() {
      let dispatch;
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedError = new Error();

        this.sandbox.stub(service, 'signIn', () => {
          return Promise.reject(expectedError);
        });
        dispatch = this.sandbox.stub();
        promise = actions.signIn(faker.internet.email(), faker.internet.password())(dispatch);
      });

      it('dispatches a sign in failure action', function() {
        return promise
          .then(expect.fail)
          .catch(() => {
            expect(dispatch.calledTwice).to.be.true;
            const [action] = dispatch.secondCall.args;
            expect(action).to.deep.equal({
              type: 'SIGN_IN_FAILURE',
              error: true,
              payload: expectedError
            });
          });
      });

      it('throws the error farther down the promise chain', function() {
        return promise
          .then(expect.fail)
          .catch((error) => {
            expect(error).to.equal(expectedError);
          });
      });
    });
  });
});
