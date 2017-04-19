import React, {
  cloneElement,
  Component,
  PropTypes
} from 'react';
import {
  Link
} from 'react-router';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      updateTokenInfo: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  children: PropTypes.node,
  location: PropTypes.shape({
    query: PropTypes.shape({
      client_id: PropTypes.string,
      expiry: PropTypes.string,
      token: PropTypes.string,
      uid: PropTypes.string
    }).isRequired
  }).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

class Register extends Component {
  componentWillMount() {
    const tokenInfo = {
      ['access-token']: this.props.location.query.token,
      client: this.props.location.query.client_id,
      expiry: this.props.location.query.expiry,
      ['token-type']: 'Bearer',
      uid: this.props.location.query.uid
    };

    this.props.actions.authentication.updateTokenInfo(tokenInfo);
    this.props.router.push('/');
  }

  render() {
    return (
      <div>
        <p>Registration Finished! You will now be directed to the <Link to="/">home page</Link>.</p>
        {this.props.children &&
          cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

Register.propTypes = propTypes;

export default Register;
