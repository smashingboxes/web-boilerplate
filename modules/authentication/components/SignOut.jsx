import React, {
  PropTypes
} from 'react';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      signOut: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

function SignOut({ actions, router }) {
  function handleSignOut() {
    actions.authentication.signOut();
    router.push('/sign-in');
  }

  return <a onClick={handleSignOut}>Sign Out</a>;
}

SignOut.propTypes = propTypes;

export default SignOut;
