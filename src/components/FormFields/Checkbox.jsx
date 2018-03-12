import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string
};

function Checkbox({ input, label }) {
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <input type="checkbox" id={input.name} {...input} />
    </div>
  );
}

Checkbox.propTypes = propTypes;

export default Checkbox;
