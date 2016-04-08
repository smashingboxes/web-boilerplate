import React from 'react';
import {Route, Router, browserHistory} from 'react-router';
import HelloWorld from './hello-world/HelloWorld';

export const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={HelloWorld} />
    </Router>
  );
};
