import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string
};

function TextArea({ input, label }) {
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <input type="radio" id={input.name} {...input} />
    </div>
  );
}

TextArea.propTypes = propTypes;

export default TextArea;
