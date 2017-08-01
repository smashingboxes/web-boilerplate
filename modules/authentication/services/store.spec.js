import StoreService from './store';
import * as redux from 'redux';
import * as reduxDevtoolsExtension from 'redux-devtools-extension/developmentOnly';
import * as reduxPersist from 'redux-persist';

describe('authentication/storeService', function() {
  let createStore;
  let expectedStore;

  beforeEach(function() {
    this.sandbox = sandbox.create();
    expectedStore = { foo: 'bar' };
    createStore = this.sandbox.stub(redux, 'createStore').returns(expectedStore);
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('constructor', function() {
    let expectedComposeResult;
    let expectedReducers;
    let expectedStorage;
    let hydrateStore;
    let storeService;

    beforeEach(function() {
      expectedComposeResult = () => { return 'foo'; };
      expectedReducers = () => { return 'baz'; };
      expectedStorage = { cookies: ['bar'] };
      this.sandbox.stub(reduxDevtoolsExtension, 'composeWithDevTools', expectedComposeResult);
      hydrateStore = this.sandbox.stub(StoreService.prototype, 'hydrateStore');
      storeService = new StoreService(expectedReducers, expectedStorage);
    });

    it("calls React's createStore", function() {
      expect(createStore.calledOnce).to.be.true;
      const [reducers, composeResult] = createStore.firstCall.args;
      expect(reducers).to.equal(expectedReducers);
      expect(composeResult).to.equal('foo');
    });

    it('sets the store', function() {
      expect(storeService.store).to.equal(expectedStore);
    });

    it('calls hydrateStore', function() {
      expect(hydrateStore.calledOnce).to.be.true;
    });

    it('assigns storage to the instance', function() {
      expect(storeService.storage).to.equal(expectedStorage);
    });
  });

  describe('getHydratedState', function() {
    let getState;
    let hydrateStore;
    let promise;
    let storeService;

    beforeEach(function() {
      getState = this.sandbox.stub();
      hydrateStore = this.sandbox.stub(StoreService.prototype, 'hydrateStore').returns(Promise.resolve());
      storeService = new StoreService();
      storeService.store = { getState };
      promise = storeService.getHydratedState();
    });

    it('calls hydrateStore here as well', function() {
      expect(hydrateStore.calledTwice).to.be.true;
    });

    it('calls getState on the store', function() {
      return promise
        .then(() => {
          expect(getState.calledOnce).to.be.true;
        });
    });
  });

  describe('getStore', function() {
    let store;
    let storeService;

    beforeEach(function() {
      expectedStore = { foo: 'foo' };
      this.sandbox.stub(StoreService.prototype, 'hydrateStore');
      storeService = new StoreService();
      storeService.store = expectedStore;
      store = storeService.getStore();
    });

    it('returns the store', function() {
      expect(store).to.deep.equal(expectedStore);
    });
  });

  describe('hydrateStore', function() {
    let StubbedStoreService;

    beforeEach(() => {
      StubbedStoreService = () => {};
      StubbedStoreService.prototype = Object.create(StoreService.prototype);
      StubbedStoreService.constructor = StubbedStoreService;
    });

    context('when there is a hydratedStore', function() {
      let expectedHydratedStore;
      let hydratedStore;
      let persistStore;
      let storeService;

      beforeEach(function() {
        expectedHydratedStore = { foo: 'baz' };
        persistStore = this.sandbox.stub(reduxPersist, 'persistStore');
        storeService = new StubbedStoreService();
        storeService.hydratedStore = expectedHydratedStore;
        hydratedStore = storeService.hydrateStore();
      });

      it('returns the hydratedStore', function() {
        expect(hydratedStore).to.equal(expectedHydratedStore);
      });

      it('does not create a new hydrated instance of the store', function() {
        expect(persistStore.called).to.be.false;
      });
    });

    context('when there is not a hydratedStore', function() {
      let expectedState;
      let expectedStorage;
      let persistStore;
      let promise;
      let storeService;

      beforeEach(function() {
        expectedState = { foo: 'bar' };
        expectedStorage = { bar: 'foo' };
        persistStore = this.sandbox.stub(reduxPersist, 'persistStore');
        storeService = new StubbedStoreService();
        storeService.store = expectedStore;
        storeService.storage = expectedStorage;
        promise = storeService.hydrateStore();
      });

      it('creates a new hydrated instance of the store via persistStore', function() {
        expect(persistStore.calledOnce).to.be.true;
        const [store, options, callback] = persistStore.firstCall.args;
        expect(store).to.equal(expectedStore);
        expect(options).to.deep.equal({
          storage: expectedStorage,
          whitelist: ['authentication']
        });
        callback(null, expectedState);
        return promise
          .then((state) => {
            expect(state).to.equal(expectedState);
            expect(storeService.hydratedStore).to.be.an.instanceOf(Promise);
          });
      });
    });
  });
});
