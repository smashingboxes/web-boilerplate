import React, {
  cloneElement,
  Component
} from 'react';
import PropTypes from 'prop-types';
import mapFormValues from '../utils/mapFormValues';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      resetPassword: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  baseClassName: PropTypes.string,
  children: PropTypes.node,
  location: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  })
};

const defaultProps = {
  baseClassName: 'c-form'
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.resetPasswordForm.elements);

    const resetPasswordOptions = {
      ...values,
      'access-token': this.props.location.query.token,
      client: this.props.location.query.client_id,
      uid: this.props.location.query.uid
    };

    return this.props.actions.authentication
      .resetPassword(resetPasswordOptions)
      .then(() => {
        this.props.router.replace({ pathname: '/' });
      });
  }

  render() {
    return (
      <form
        className={this.props.baseClassName}
        ref={(form) => { this.resetPasswordForm = form; }}
        onSubmit={this.handleSubmit}
      >
        <label className={`${this.props.baseClassName}__title`} htmlFor="password">
          Password
          <input className={`${this.props.baseClassName}__field`} name="password" type="password" />
        </label>
        <label className={`${this.props.baseClassName}__title`} htmlFor="password_confirmation">
          Password Confirmation
          <input className={`${this.props.baseClassName}__field`} name="password_confirmation" type="password" />
        </label>
        {this.props.children &&
          cloneElement(this.props.children, this.props)}
        <input className={`${this.props.baseClassName}__button`} type="submit" value="Submit" />
      </form>
    );
  }
}

ResetPassword.propTypes = propTypes;
ResetPassword.defaultProps = defaultProps;

export default ResetPassword;
