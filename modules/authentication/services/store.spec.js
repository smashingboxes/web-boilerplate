import StoreService from './store';

describe('Store service', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('constructor', function() {
    let hydrateStore;

    beforeEach(function() {
      hydrateStore = this.sandbox.stub(StoreService.prototype, 'hydrateStore');
      return new StoreService(() => {});
    });

    it('calls hydrateStore', function() {
      expect(hydrateStore.calledOnce).to.be.true;
    });
  });

  describe('getHydratedState', function() {
    let expectedStore;
    let getState;
    let promise;
    let storeService;

    beforeEach(function() {
      getState = this.sandbox.stub();
      expectedStore = { getState };
      this.sandbox.stub(StoreService.prototype, 'hydrateStore').returns(Promise.resolve());
      storeService = new StoreService(() => {});
      storeService.store = expectedStore;
      promise = storeService.getHydratedState();
    });

    it('calls getState on the store', function() {
      return promise
        .then(() => {
          expect(getState.calledOnce).to.be.true;
        });
    });
  });

  describe('getStore', function() {
    let expectedStore;
    let getStore;
    let storeService;

    beforeEach(function() {
      expectedStore = { foo: 'bar' };
      this.sandbox.stub(StoreService.prototype, 'hydrateStore').returns(Promise.resolve());
      storeService = new StoreService(() => {});
      storeService.store = expectedStore;
      getStore = storeService.getStore();
    });

    it('returns the store', function() {
      expect(getStore).to.deep.equal(expectedStore);
    });
  });

  describe('hydrateStore', function() {
    context('when there is a hydratedStore', function() {
      let expectedHydratedStore;
      let hydrateStore;
      let storeService;

      beforeEach(function() {
        expectedHydratedStore = { foo: 'bar' };
        storeService = new StoreService(() => {});
        storeService.hydratedStore = expectedHydratedStore;
        hydrateStore = storeService.hydrateStore();
      });

      it('returns the hydratedStore', function() {
        expect(hydrateStore).to.equal(expectedHydratedStore);
      });
    });

    context('when there is not a hydratedStore', function() {
      let storeService;

      beforeEach(function() {
        this.sandbox.stub(StoreService.prototype, 'hydrateStore');
        storeService = new StoreService(() => {});
      });

      it('sets the hydratedStore', function() {
        expect(storeService.hydratedStore).to.be.undefined;
        // I initially have hydrateStore stubbed out because it's called in constructor.
        // I unstub it here so it can be known that hydratedStore is being set.
        this.sandbox.restore();
        const promise = storeService.hydrateStore();
        return promise
          .then(() => {
            expect(storeService.hydratedStore).to.not.be.undefined;
          });
      });
    });
  });
});
