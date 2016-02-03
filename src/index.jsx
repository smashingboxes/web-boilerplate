import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, browserHistory} from 'react-router';

import HelloWorld from './hello-world/HelloWorld.jsx';

ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={HelloWorld} />
  </Router>, document.getElementById('root'));
