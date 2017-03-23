import StoreService from './store';
import * as redux from 'redux';
import * as reduxPersist from 'redux-persist';

describe('Store service', function() {
  let expectedStore;

  beforeEach(function() {
    this.sandbox = sandbox.create();
    expectedStore = { foo: 'bar' };
    this.sandbox.stub(redux, 'createStore').returns(expectedStore);
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('constructor', function() {
    let expectedStorage;
    let hydrateStore;
    let storeService;

    beforeEach(function() {
      expectedStorage = { cookies: ['bar'] };
      hydrateStore = this.sandbox.stub(StoreService.prototype, 'hydrateStore');
      storeService = new StoreService(() => {}, expectedStorage);
    });

    it("sets the store via React's createStore", function() {
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
      let expectedHydratedStore;
      let persistStore;
      let storeService;

      beforeEach(function() {
        expectedHydratedStore = { foo: 'bar' };
        persistStore = this.sandbox.stub(reduxPersist, 'persistStore').returns(expectedHydratedStore);
        storeService = new StubbedStoreService();
        storeService.hydrateStore();
      });

      it('creates a new hydrated instance of the store via persistStore', function() {
        expect(persistStore.calledOnce).to.be.true;
        expect(storeService.hydratedStore).to.not.be.undefined;
      });
    });
  });
});
