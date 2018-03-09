import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.isRequired
    })
  ).isRequired
};

function TextArea({ input, label, options }) {
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <select id={input.name} {...input}>
        {
          options.map((option) => {
            return <option key={option.value} value={option.value}>{option.text}</option>;
          })
        }
      </select>
    </div>
  );
}

TextArea.propTypes = propTypes;

export default TextArea;
