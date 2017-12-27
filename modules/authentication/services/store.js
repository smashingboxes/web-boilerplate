import {
  applyMiddleware,
  createStore
} from 'redux';
import {
  composeWithDevTools
} from 'redux-devtools-extension/developmentOnly';
import {
  persistStore
} from 'redux-persist';
import thunk from 'redux-thunk';

class Store {
  constructor(reducers, storage) {
    this.storage = storage;
    this.store = createStore(
      reducers,
      composeWithDevTools(
        applyMiddleware(thunk)
      )
    );

    this.hydrateStore();

    if (module.hot) {
      module.hot.accept(reducers, () => {
        const nextRootReducer = reducers.default;
        this.store.replaceReducer(nextRootReducer);
      });
    }
  }

  getHydratedState() {
    return this.hydrateStore()
      .then(() => this.store.getState());
  }

  getStore() {
    return this.store;
  }

  getStorage() {
    return this.storage;
  }

  hydrateStore() {
    if (!this.hydratedStore) {
      this.hydratedStore = new Promise(() => {
        persistStore(
          this.store,
          null,
          () => this.store.getState()
        );
      });
    }

    return this.hydratedStore;
  }
}

export default Store;
