import React, {
  cloneElement,
  Component,
  PropTypes
} from 'react';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      requestPasswordReset: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  children: PropTypes.node,
  location: PropTypes.shape({
    query: PropTypes.shape({
      next: PropTypes.string
    }).isRequired
  }).isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  })
};

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const values = Array.prototype.reduce.call(this.forgotPasswordForm.elements, (memo, element) => {
      if (element.name && element.value) {
        memo[element.name] = element.value;
      }

      return memo;
    }, {});
    values.redirect_url = window.location.origin;

    return this.props.actions.authentication
      .requestPasswordReset(values)
      .then(() => {
        this.props.router.replace({ pathname: '/' });
      });
  }

  render() {
    return (
      <form ref={(form) => { this.forgotPasswordForm = form; }} onSubmit={this.handleSubmit}>
        <label htmlFor="email">
          Email
          <input name="email" type="text" />
        </label>
        {this.props.children &&
          cloneElement(this.props.children, this.props)}
        <input type="submit" value="Reset Password" />
      </form>
    );
  }
}

ForgotPassword.propTypes = propTypes;

export default ForgotPassword;
