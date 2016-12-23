import React, { PropTypes } from 'react';

import Greeting from './Greeting';
import NameTaker from './NameTaker';

const propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

function App({ name, onSubmit }) {
  return (
    <div>
      <Greeting name={name} />
      <NameTaker name={name} onSubmit={onSubmit} />
    </div>
  );
}

App.propTypes = propTypes;

export default App;
