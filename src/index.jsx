import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import './css/index.css';

const rootEl = document.getElementById('root');

function render() {
  const Routes = require('./Routes').default;
  ReactDOM.render(
    <Provider store={store.getStore()}>
      <Routes store={store} />
    </Provider>,
    rootEl
  );
}

if (module.hot) {
  module.hot.accept('./Routes', render);
}

render();
