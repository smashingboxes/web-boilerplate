import Immutable from 'immutable';
import apiService from '../../../src/services/api';
import authenticationService from './index';

describe('authentication/service', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('checkAuth', function() {
    context('when there is stored token info', function() {
      let callback;
      let getHydratedState;
      let promise;
      let replace;

      beforeEach(function() {
        const state = Immutable.fromJS({
          authentication: {
            tokenInfo: {
              'access-token': faker.internet.password(),
              client: faker.internet.password(),
              expiry: Date.now().toString(),
              'token-type': faker.random.word(),
              uid: faker.internet.email()
            }
          }
        });

        callback = this.sandbox.stub();
        replace = this.sandbox.stub();
        getHydratedState = this.sandbox.spy(() => Promise.resolve(state));
        promise = authenticationService.checkAuth({ getHydratedState })(null, replace, callback);
      });

      it('gets the hydrated state from the store', function() {
        expect(getHydratedState.calledOnce).to.be.true;
      });

      it('invokes the callback to continue on to the selected route', function() {
        return promise.then(() => {
          expect(callback.calledOnce).to.be.true;
        });
      });
    });

    const failingTestCases = [
      {
        description: 'when there is not stored token info',
        state: Immutable.fromJS({ authentication: { tokenInfo: {} } })
      },
      {
        description: 'when there is stored token info but it does not have valid info fields',
        state: Immutable.fromJS({
          authentication: {
            tokenInfo: {
              [faker.random.word()]: faker.hacker.phrase(),
              [faker.random.word()]: faker.hacker.phrase(),
              [faker.random.word()]: faker.hacker.phrase(),
              [faker.random.word()]: faker.hacker.phrase(),
              [faker.random.word()]: faker.hacker.phrase()
            }
          }
        })
      }
    ];

    failingTestCases.forEach(function(testCase) {
      context(testCase.description, function() {
        let callback;
        let getHydratedState;
        let replace;

        beforeEach(function() {
          callback = this.sandbox.stub();
          replace = this.sandbox.stub();
          getHydratedState = this.sandbox.spy(() => Promise.resolve(testCase.state));
        });

        it('redirects to the sign in page', function() {
          const nextState = { location: { query: {} } };

          return authenticationService
            .checkAuth({ getHydratedState })(nextState, replace, callback)
            .then(() => {
              expect(replace.called).to.be.true;
              const [{ pathname }] = replace.firstCall.args;
              expect(pathname).to.deep.equal('/sign-in');
              expect(callback.calledOnce).to.be.true;
            });
        });

        it('carries along the query params to the sign in page', function() {
          const nextState = {
            location: {
              query: {
                q: faker.hacker.phrase()
              }
            }
          };

          return authenticationService
            .checkAuth({ getHydratedState })(nextState, replace, callback)
            .then(() => {
              const [{ query }] = replace.firstCall.args;
              expect(query).to.deep.equal(nextState.location.query);
            });
        });

        it('passes along the url the user was trying to visit', function() {
          const nextState = {
            location: {
              pathname: faker.random.word()
            }
          };

          return authenticationService
            .checkAuth({ getHydratedState })(nextState, replace, callback)
            .then(() => {
              const [{ query }] = replace.firstCall.args;
              expect(query.next).to.equal(nextState.location.pathname);
            });
        });
      });
    });
  });

  describe('register', function() {
    context('a successful request', function() {
      let expectedEmail;
      let expectedId;
      let expectedName;
      let expectedCredentials;
      let post;
      let promise;

      beforeEach(function() {
        expectedEmail = faker.internet.email();
        expectedId = faker.random.number();
        expectedName = faker.name.findName();
        expectedCredentials = {
          confirm_success_url: 'some url',
          email: expectedEmail,
          name: expectedName,
          password: faker.internet.password()
        };
        post = this.sandbox.stub(apiService, 'post').callsFake(() => {
          return Promise.resolve({
            data: {
              data: {
                email: expectedEmail,
                id: expectedId,
                name: expectedName
              }
            }
          });
        });

        promise = authenticationService.register(expectedCredentials);
      });

      it('sends a request to register the invited user', function() {
        expect(post.calledOnce).to.be.true;
        const [endpoint, credentials] = post.firstCall.args;
        expect(endpoint).to.equal('/auth');
        expect(credentials).to.equal(expectedCredentials);
      });

      it('returns the token and user info', function() {
        return promise
          .then(({ email, id, name }) => {
            expect(email).to.equal(expectedEmail);
            expect(id).to.equal(expectedId);
            expect(name).to.equal(expectedName);
          });
      });
    });

    context('a failed request', function() {
      context('when it sends a 404 error', function() {
        let promise;

        beforeEach(function() {
          this.sandbox.stub(apiService, 'post').callsFake(() => {
            const err = new Error();
            err.response = { status: 404 };
            return Promise.reject(err);
          });
          promise = authenticationService.register();
        });

        it('throws an error', function() {
          return promise
            .then(expect.fail)
            .catch((err) => {
              expect(err.message).to.eq('Could not find user to match given registration id');
            });
        });
      });

      context('when it sends a non-404 error', function() {
        let promise;

        beforeEach(function() {
          this.sandbox.stub(apiService, 'post').callsFake(() => {
            const err = new Error();
            err.response = { status: 422 };
            return Promise.reject(err);
          });
          promise = authenticationService.register();
        });

        it('throws the error through down the chain', function() {
          return promise
            .then(expect.fail)
            .catch((err) => {
              expect(err.message).to.equal('There was a problem registering. Please try again.');
            });
        });
      });
    });
  });

  describe('prehydrateStore', function() {
    context('a successful hydration', function() {
      let callback;
      let hydrateStore;
      let promise;
      let store;

      beforeEach(function() {
        callback = this.sandbox.spy();
        hydrateStore = this.sandbox.stub().returns(Promise.resolve());
        store = { hydrateStore };
        promise = authenticationService.prehydrateStore(store)(null, null, callback);
      });

      it('calls hydrateStore', function() {
        expect(hydrateStore.calledOnce).to.be.true;
      });

      it('calls the callback', function() {
        return promise
          .then(() => {
            expect(callback.calledOnce).to.be.true;
          });
      });
    });

    context('a failed hydration', function() {
      let hydrateStore;
      let promise;
      let store;

      beforeEach(function() {
        hydrateStore = this.sandbox.stub().returns(Promise.reject());
        store = { hydrateStore };
        promise = authenticationService.prehydrateStore(store)();
      });

      it('throws an error', function() {
        return promise
          .then(expect.fail)
          .catch((err) => {
            expect(hydrateStore.calledOnce).to.be.true;
            expect(err.message).to.equal('The store failed to prehydrate. This will prevent the user from logging in upon a confirmed registration.');
          });
      });
    });
  });

  describe('requestPasswordReset', function() {
    context('a successful request', function() {
      let expectedParams;
      let message;
      let post;
      let promise;

      beforeEach(function() {
        expectedParams = {
          email: faker.internet.email()
        };
        message = faker.random.word();
        post = this.sandbox.stub(apiService, 'post').callsFake(() => {
          return Promise.resolve({
            data: { message }
          });
        });
        promise = authenticationService.requestPasswordReset(expectedParams);
      });

      it('requests a token for that user based upon email', function() {
        expect(post.calledOnce).to.be.true;
        const [endpoint, params] = post.firstCall.args;
        expect(endpoint).to.equal('/auth/password');
        expect(params).to.deep.equal(expectedParams);
      });

      it('returns a successful message', function() {
        return promise
          .then(({ response }) => {
            expect(response).to.eq(message);
          });
      });
    });

    context('a failed request', function() {
      context('when it sends a 404 error', function() {
        let notFoundEmail;
        let promise;

        beforeEach(function() {
          notFoundEmail = faker.internet.email();
          const params = {
            email: notFoundEmail
          };
          this.sandbox.stub(apiService, 'post').callsFake(() => {
            const err = new Error();
            err.response = { status: 404 };
            return Promise.reject(err);
          });
          promise = authenticationService.requestPasswordReset(params);
        });

        it('returns an error message', function() {
          return promise
            .then(expect.fail)
            .catch((err) => {
              expect(err.message).to.eq(`Could not find existing user ${notFoundEmail}`);
            });
        });
      });

      context('when it sends a non-404 error', function() {
        let promise;

        beforeEach(function() {
          this.sandbox.stub(apiService, 'post').callsFake(() => {
            const err = new Error();
            err.response = { status: 422 };
            return Promise.reject(err);
          });
          promise = authenticationService.requestPasswordReset();
        });

        it('throws the error through down the chain', function() {
          return promise
            .then(expect.fail)
            .catch((err) => {
              expect(err.message).to.equal('There was a problem requesting a password reset token.');
            });
        });
      });
    });
  });

  describe('resetPassword', function() {
    context('a successful request', function() {
      let expectedEmail;
      let expectedId;
      let expectedName;
      let expectedParams;
      let put;
      let promise;

      beforeEach(function() {
        expectedEmail = faker.internet.email();
        expectedId = faker.random.number();
        expectedName = faker.random.word();
        expectedParams = {
          password: faker.internet.password()
        };
        put = this.sandbox.stub(apiService, 'put').callsFake(() => {
          return Promise.resolve({
            data: {
              email: expectedEmail,
              id: expectedId,
              name: expectedName
            }
          });
        });

        promise = authenticationService.resetPassword(expectedParams);
      });

      it('sends a request to reset the password with the new password', function() {
        expect(put.calledOnce).to.be.true;
        const [endpoint, params] = put.firstCall.args;
        expect(endpoint).to.equal('/auth/password');
        expect(params).to.equal(expectedParams);
      });

      it('returns the user info', function() {
        return promise
          .then(({ email, id, name }) => {
            expect(email).to.equal(expectedEmail);
            expect(id).to.equal(expectedId);
            expect(name).to.equal(expectedName);
          });
      });
    });

    context('a failed request', function() {
      let promise;

      beforeEach(function() {
        this.sandbox.stub(apiService, 'post').callsFake(() => {
          const err = new Error();
          return Promise.reject(err);
        });
        promise = authenticationService.resetPassword();
      });

      it('throws an error', function() {
        return promise
          .then(expect.fail)
          .catch((err) => {
            expect(err.message).to.eq('There was a problem reseting your password. Please try again.');
          });
      });
    });
  });

  describe('signIn', function() {
    context('a successful sign in', function() {
      let expectedCredentials;
      let expectedEmail;
      let expectedId;
      let expectedName;
      let expectedPassword;
      let expectedUid;
      let post;
      let promise;

      beforeEach(function() {
        expectedEmail = faker.internet.email();
        expectedId = faker.random.number();
        expectedName = faker.random.word();
        expectedPassword = faker.internet.password();
        expectedUid = faker.internet.email();
        expectedCredentials = {
          email: expectedEmail,
          password: expectedPassword
        };
        post = this.sandbox.stub(apiService, 'post').callsFake(() => {
          return Promise.resolve({
            data: {
              data: {
                email: expectedEmail,
                id: expectedId,
                name: expectedName,
                uid: expectedUid
              }
            }
          });
        });

        promise = authenticationService.signIn(expectedCredentials);
      });

      it('signs the user in', function() {
        expect(post.calledOnce).to.be.true;
        const [endpoint, values] = post.firstCall.args;
        expect(endpoint).to.equal('/auth/sign_in');
        expect(values).to.equal(expectedCredentials);
      });

      it("returns the user's data", function() {
        return promise
          .then(({ email, id, name, uid }) => {
            expect(email).to.equal(expectedEmail);
            expect(id).to.equal(expectedId);
            expect(name).to.equal(expectedName);
            expect(uid).to.equal(expectedUid);
          });
      });
    });

    context('a failed sign in', function() {
      context('401 Unauthorized', function() {
        let promise;

        beforeEach(function() {
          this.sandbox.stub(apiService, 'post').callsFake(() => {
            const err = new Error();
            err.response = { status: 401 };
            return Promise.reject(err);
          });
          promise = authenticationService.signIn(faker.internet.email(), faker.internet.password());
        });

        it('throws an error about login details not being able to be verified', function() {
          return promise
            .then(expect.fail)
            .catch((err) => {
              expect(err).to.be.an('error');
              expect(err.message).to.equal('Your credentials could not be verified. Please try again.');
            });
        });
      });

      context('non-401 errors', function() {
        let promise;

        beforeEach(function() {
          this.sandbox.stub(apiService, 'post').callsFake(() => {
            const err = new Error();
            err.response = { status: 422 };
            return Promise.reject(err);
          });
          promise = authenticationService.signIn(faker.internet.email(), faker.internet.password());
        });

        it('throws the error through down the chain', function() {
          return promise
            .then(expect.fail)
            .catch((err) => {
              expect(err).to.be.an('error');
              expect(err.message).to.equal('There was a problem signing in. Please try again.');
            });
        });
      });
    });
  });

  describe('signOut', function() {
    let deleteRequest;

    beforeEach(function() {
      deleteRequest = this.sandbox.stub(apiService, 'delete').callsFake(() => {
        return Promise.resolve();
      });
      authenticationService.signOut();
    });

    it('sends a DELETE request to sign_out', function() {
      expect(deleteRequest.calledOnce).to.be.true;
      const [endpoint] = deleteRequest.firstCall.args;
      expect(endpoint).to.equal('/auth/sign_out');
    });
  });
});
