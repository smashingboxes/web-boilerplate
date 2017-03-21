import React, {
  PropTypes
} from 'react';

const propTypes = {
  actions: PropTypes.object
};

function SignIn() {
  return (
    <form>
      <label htmlFor="email">
        Email
        <input name="email" type="text" />
      </label>
      <label htmlFor="password">
        Password
        <input name="password" type="password" />
      </label>
    </form>
  );
}

SignIn.propTypes = propTypes;

export default SignIn;
