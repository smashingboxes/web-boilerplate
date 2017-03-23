import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import './css/index.css';

const rootEl = document.getElementById('root');

let render = () => {
  const Routes = require('./Routes').default;
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    );
  };

  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };

  module.hot.accept('./Routes', render);
}

render();
