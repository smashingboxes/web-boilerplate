import React, {
  cloneElement,
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router';
import services from '../services';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      updateTokenInfo: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  baseClassName: PropTypes.string,
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

class RegistrationConfirmed extends Component {
  componentWillMount() {
    const { query } = this.props.location;
    const tokenInfo = {
      'access-token': query.token,
      client: query.client_id,
      expiry: query.expiry,
      'token-type': 'Bearer',
      uid: query.uid
    };

    return services.updateTokenInfo(tokenInfo, this.props)
      .then(() => {
        this.props.router.push('/');
      });
  }

  render() {
    return (
      <div className={this.props.baseClassName}>
        <p className={`${this.props.baseClassName}__title`}>Registration Finished! You will now be directed to the <Link to="/">home page</Link>.</p>
        {this.props.children &&
          cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

RegistrationConfirmed.propTypes = propTypes;

export default RegistrationConfirmed;
