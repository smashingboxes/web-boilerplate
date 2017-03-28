import * as actions from './actions';
import Interceptors from './Interceptors';
import {
  VALID_TOKEN_INFO_FIELDS
} from './constants';

describe('authentication/Interceptors', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('constructor', function() {
    let interceptors;
    let store;

    beforeEach(function() {
      store = {};
      interceptors = new Interceptors(store);
    });

    it('assigns the store argument to the instance', function() {
      expect(interceptors.store).to.equal(store);
    });
  });

  describe('addAuthenticationHeaders', function() {
    context('there is a stored bearer token', function() {
      let originalConfig;
      let promise;
      let state;
      let store;

      beforeEach(function() {
        state = {
          authentication: {
            tokenInfo: VALID_TOKEN_INFO_FIELDS.reduce((memo, field) => {
              memo[field] = faker.internet.password();
              return memo;
            }, {})
          }
        };
        store = { getHydratedState: this.sandbox.spy(() => Promise.resolve(state)) };
        originalConfig = { headers: { common: {} } };

        const interceptors = new Interceptors(store);
        promise = interceptors.addAuthenticationHeaders(originalConfig);
      });

      it("gets the store's hydrated state", function() {
        expect(store.getHydratedState.calledOnce).to.be.true;
      });

      it('returns the Axios config object', function() {
        return promise.then((config) => {
          expect(config).to.equal(originalConfig);
        });
      });

      it('applies the stored token info to the common request headers', function() {
        return promise.then((config) => {
          expect(config.headers.common).to.deep.equal(state.authentication.tokenInfo);
        });
      });
    });

    context('there is no stored bearer token', function() {
      let originalConfig;
      let promise;
      let state;
      let store;

      beforeEach(function() {
        state = { authentication: { tokenInfo: {} } };
        store = { getHydratedState: this.sandbox.spy(() => Promise.resolve(state)) };
        originalConfig = { headers: { common: {} } };

        const interceptors = new Interceptors(store);
        promise = interceptors.addAuthenticationHeaders(originalConfig);
      });

      it('returns the Axios config object without any changes', function() {
        return promise.then((config) => {
          expect(config).to.equal(originalConfig);
          expect(config).to.deep.equal(originalConfig);
        });
      });
    });
  });

  describe('invalidateHeaders', function() {
    it('invalidates');
  });

  describe('isNewToken', function() {
    it('returns true when there is no previous expiry/token', function() {
      const state = { authentication: { tokenInfo: {} } };
      const store = { getHydratedState: this.sandbox.spy(() => Promise.resolve(state)) };

      const interceptors = new Interceptors(store);
      return interceptors
        .isNewToken(Date.now().toString())
        .then((isNewToken) => {
          expect(isNewToken).to.be.true;
        });
    });

    it('returns true when the new token is newer than the previous token', function() {
      const state = {
        authentication: {
          tokenInfo: {
            expiry: faker.date.past().getTime().toString()
          }
        }
      };
      const store = { getHydratedState: this.sandbox.spy(() => Promise.resolve(state)) };

      const interceptors = new Interceptors(store);
      return interceptors
        .isNewToken(Date.now().toString())
        .then((isNewToken) => {
          expect(isNewToken).to.be.true;
        });
    });

    it('returns false when the new token is older than the previous token', function() {
      const state = {
        authentication: {
          tokenInfo: {
            expiry: faker.date.future().getTime().toString()
          }
        }
      };
      const store = { getHydratedState: this.sandbox.spy(() => Promise.resolve(state)) };

      const interceptors = new Interceptors(store);
      return interceptors
        .isNewToken(Date.now().toString())
        .then((isNewToken) => {
          expect(isNewToken).to.be.false;
        });
    });

    it('returns falsey when there is no new token/expiry', function() {
      const state = {
        authentication: {
          tokenInfo: {
            expiry: faker.date.past().getTime().toString()
          }
        }
      };
      const store = { getHydratedState: this.sandbox.spy(() => Promise.resolve(state)) };

      const interceptors = new Interceptors(store);
      return interceptors
        .isNewToken()
        .then((isNewToken) => {
          expect(isNewToken).to.be.not.ok;
        });
    });
  });

  describe('parseTokenInfoFromHeaders', function() {
    let expectedStrippedHeaders;
    let headers;
    let tokenInfo;

    beforeEach(function() {
      expectedStrippedHeaders = {
        'x-powered-by': faker.random.word(),
        'x-request-id': faker.random.uuid()
      };
      headers = {
        ...expectedStrippedHeaders,
        'access-token': faker.internet.password(),
        client: faker.internet.password(),
        expiry: faker.date.past().getTime().toString(),
        'token-type': faker.random.word(),
        uid: faker.internet.email()
      };

      const interceptors = new Interceptors();
      tokenInfo = interceptors.parseTokenInfoFromHeaders(headers);
    });

    it('includes the valid token info fields', function() {
      VALID_TOKEN_INFO_FIELDS.forEach((field) => {
        expect(tokenInfo[field]).to.be.ok;
        expect(tokenInfo[field]).to.equal(headers[field]);
      });
    });

    it('does not include keys that are do not contain valid token info', function() {
      expect(tokenInfo).to.not.include.any.keys(...Object.keys(expectedStrippedHeaders));
    });
  });

  describe('saveTokenInfo', function() {
    context('when there is new bearer token info to save', function() {
      let dispatch;
      let expectedAction;
      let expectedResponse;
      let expectedTokenInfo;
      let isNewToken;
      let parseTokenInfoFromHeaders;
      let promise;
      let store;
      let updateTokenInfo;

      beforeEach(function() {
        expectedResponse = {
          headers: {}
        };
        expectedTokenInfo = VALID_TOKEN_INFO_FIELDS.reduce((memo, field) => {
          memo[field] = faker.internet.password();
          return memo;
        }, {});
        expectedAction = {
          type: 'UPDATE_TOKEN_INFO',
          payload: expectedTokenInfo
        };

        parseTokenInfoFromHeaders = this.sandbox.stub(
          Interceptors.prototype,
          'parseTokenInfoFromHeaders',
          () => expectedTokenInfo
        );
        isNewToken = this.sandbox.stub(Interceptors.prototype, 'isNewToken', () => {
          return Promise.resolve(true);
        });
        dispatch = this.sandbox.spy(() => expectedAction);
        store = {
          getStore: this.sandbox.spy(() => {
            return { dispatch };
          })
        };
        updateTokenInfo = this.sandbox.stub(actions, 'updateTokenInfo', () => expectedAction);

        const interceptors = new Interceptors(store);
        promise = interceptors.saveTokenInfo(expectedResponse);
      });

      it('parses the token info from the response', function() {
        expect(parseTokenInfoFromHeaders.calledOnce).to.be.true;
        const [headers] = parseTokenInfoFromHeaders.firstCall.args;
        expect(headers).to.equal(expectedResponse.headers);
      });

      it('checks that the token is newer than any existing token', function() {
        return promise.then(() => {
          expect(isNewToken.calledOnce).to.be.true;
          const [expiry] = isNewToken.firstCall.args;
          expect(expiry).to.equal(expectedTokenInfo.expiry);
        });
      });

      it('dispatches an update token info action', function() {
        return promise.then(() => {
          expect(store.getStore.calledOnce).to.be.true;

          expect(updateTokenInfo.calledOnce).to.be.true;
          const [tokenInfo] = updateTokenInfo.firstCall.args;
          expect(tokenInfo).to.equal(expectedTokenInfo);

          expect(dispatch.calledOnce).to.be.true;
          const [action] = dispatch.firstCall.args;
          expect(action).to.equal(expectedAction);
        });
      });

      it('passes on the original response without changing it', function() {
        return promise.then((response) => {
          expect(response).to.equal(expectedResponse);
          expect(response).to.deep.equal(expectedResponse);
        });
      });
    });

    context('when there is new bearer token info but it is older than the already stored token', function() {
      let dispatch;
      let expectedResponse;
      let expectedTokenInfo;
      let promise;
      let store;

      beforeEach(function() {
        expectedResponse = {
          headers: {}
        };
        expectedTokenInfo = VALID_TOKEN_INFO_FIELDS.reduce((memo, field) => {
          memo[field] = faker.internet.password();
          return memo;
        }, {});

        this.sandbox.stub(
          Interceptors.prototype,
          'parseTokenInfoFromHeaders',
          () => expectedTokenInfo
        );
        this.sandbox.stub(Interceptors.prototype, 'isNewToken', () => Promise.resolve(false));
        dispatch = this.sandbox.stub();
        store = { getStore: () => { return { dispatch }; } };

        const interceptors = new Interceptors(store);
        promise = interceptors.saveTokenInfo(expectedResponse);
      });

      it('does not dispatch an update token info action', function() {
        return promise.then(() => {
          expect(dispatch.called).to.be.false;
        });
      });
    });

    context('when there is no bearer token info to save', function() {
      let expectedResponse;
      let isNewToken;
      let response;

      beforeEach(function() {
        expectedResponse = {};

        this.sandbox.stub(
          Interceptors.prototype,
          'parseTokenInfoFromHeaders',
          () => { return {}; }
        );
        isNewToken = this.sandbox.stub(Interceptors.prototype, 'isNewToken', () => {
          return Promise.resolve(true);
        });

        const interceptors = new Interceptors();
        response = interceptors.saveTokenInfo(expectedResponse);
      });

      it('does not check to see if it is a new token to update', function() {
        expect(isNewToken.called).to.be.false;
      });

      it('passes on the original response without changing it', function() {
        expect(response).to.equal(expectedResponse);
        expect(response).to.deep.equal(expectedResponse);
      });
    });
  });
});
