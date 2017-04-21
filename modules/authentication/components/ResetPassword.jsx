import React, {
  cloneElement,
  Component,
  PropTypes
} from 'react';
import mapFormValues from '../utils/mapFormValues';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      resetPassword: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  children: PropTypes.node,
  location: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  })
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
      'access-token': this.props.location.query.token,
      client: this.props.location.query.client_id,
      password: values.password,
      password_confirmation: values.password_confirmation,
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
      <form ref={(form) => { this.resetPasswordForm = form; }} onSubmit={this.handleSubmit}>
        <label htmlFor="password">
          Password
          <input name="password" type="password" />
        </label>
        <label htmlFor="password_confirmation">
          Password Confirmation
          <input name="password_confirmation" type="password" />
        </label>
        {this.props.children &&
          cloneElement(this.props.children, this.props)}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ResetPassword.propTypes = propTypes;

export default ResetPassword;
