import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Routes} from './Routes';

import {configureStore} from './stores';

const store = configureStore();

ReactDOM.render(<Provider store={store}>
  <Routes />
</Provider>, document.getElementById('root'));
