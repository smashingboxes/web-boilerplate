import React from 'react';
import {Route, Router, browserHistory} from 'react-router';
import HelloWorld from './hello-world/HelloWorld.jsx';

export const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={HelloWorld} />
  </Router>
);
