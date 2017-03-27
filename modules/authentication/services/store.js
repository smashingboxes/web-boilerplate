import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import {
  autoRehydrate,
  persistStore
} from 'redux-persist';
import thunk from 'redux-thunk';

class Store {
  constructor(reducers, storage) {
    this.storage = storage;
    this.store = createStore(
      reducers,
      compose(
        applyMiddleware(thunk),
        autoRehydrate()
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

  hydrateStore() {
    if (!this.hydratedStore) {
      this.hydratedStore = new Promise((resolve, reject) => {
        persistStore(
          this.store,
          {
            storage: this.storage,
            whitelist: ['authentication']
          },
          (err, state) => {
            if (err) { reject(err); }
            resolve(state);
          }
        );
      });
    }

    return this.hydratedStore;
  }
}

export default Store;
