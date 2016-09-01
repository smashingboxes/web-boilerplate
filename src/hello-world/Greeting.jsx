import React, { PropTypes } from 'react';

import './greeting.scss';

const Greeting = ({ name }) => {
  return (
    <div className="greeting">
      <div className="greeting__icon" />
      Hello, {name}
    </div>
  );
};

Greeting.propTypes = {
  name: PropTypes.string
};

Greeting.defaultProps = {
  name: 'World'
};

export default Greeting;
