import React from 'react';
import PropTypes from 'prop-types';

import Greeting from './Greeting';
// import NameTaker from '../containers/NameTaker';
import SignOut from '../../modules/authentication/containers/SignOut';

const propTypes = {
  name: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  tokenInfo: PropTypes.object.isRequired
};

const defaultProps = {
  name: 'World'
};

function App({ name, router, tokenInfo }) {
  return (
    <div>
      {Object.keys(tokenInfo).length > 0 &&
        <SignOut router={router} />}
      <Greeting name={name} />
      {/*
        // Uncomment this and a few other imports for an example reduxForm setup
        // We have this commented out and unimported so that reduxForm doesn't
        // pollute the build unless we need it
        <NameTaker name={name} />
      */}
    </div>
  );
}

App.propTypes = propTypes;

App.defaultProps = defaultProps;

export default App;
