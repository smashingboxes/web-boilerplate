import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string
};

function Text({ input, label }) {
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <input type="text" id={input.name} {...input} />
    </div>
  );
}

Text.propTypes = propTypes;

export default Text;
