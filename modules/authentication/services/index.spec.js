import apiService from '../../../src/services/api';
import authenticationService from './index';

describe('Authentication service', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('signIn', function() {
    context('a successful sign in', function() {
      let expectedEmail;
      let expectedId;
      let expectedName;
      let expectedPassword;
      let post;
      let promise;

      beforeEach(function() {
        expectedEmail = faker.internet.email();
        expectedId = faker.random.number();
        expectedName = faker.random.word();
        expectedPassword = faker.internet.password();
        post = this.sandbox.stub(apiService, 'post', () => {
          return Promise.resolve({
            data: {
              email: expectedEmail,
              id: expectedId,
              name: expectedName
            }
          });
        });

        promise = authenticationService.signIn(expectedEmail, expectedPassword);
      });

      it('signs the user in', function() {
        expect(post.calledOnce).to.be.true;
        const [endpoint, { email, password }] = post.firstCall.args;
        expect(endpoint).to.equal('/auth/signin');
        expect(email).to.equal(expectedEmail);
        expect(password).to.equal(expectedPassword);
      });

      it("returns the user's data", function() {
        return promise
          .then(({ email, id, name }) => {
            expect(email).to.equal(expectedEmail);
            expect(id).to.equal(expectedId);
            expect(name).to.equal(expectedName);
          });
      });
    });

    context('a failed sign in', function() {
      context('401 Unauthorized', function() {
        let promise;

        beforeEach(function() {
          this.sandbox.stub(apiService, 'post', () => {
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
            });
        });
      });

      context('non-401 errors', function() {
        let promise;

        beforeEach(function() {
          this.sandbox.stub(apiService, 'post', () => {
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
            });
        });
      });
    });
  });
});
