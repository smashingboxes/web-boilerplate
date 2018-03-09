import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form/immutable';
import { Text /* , TextArea, Select, Checkbox, Radio */ } from './FormFields';

const propTypes = {
  name: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
};

function NameTaker(props) {
  const {
    handleSubmit
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={Text}
        label="Name"
        name="name"
      />

      <button>Submit</button>
    </form>
  );
}

NameTaker.propTypes = propTypes;

export default NameTaker;
