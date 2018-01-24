import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string
};

function Greeting({ name = 'World' }) {
  return (
    <div className="c-greeting">
      <div className="c-greeting__icon" />
      Hello, {name}
    </div>
  );
}

Greeting.propTypes = propTypes;

export default Greeting;
