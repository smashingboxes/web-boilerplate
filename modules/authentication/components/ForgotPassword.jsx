import React, {
  cloneElement,
  Component,
  PropTypes
} from 'react';
import mapFormValues from '../utils/mapFormValues';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      requestPasswordReset: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  baseClassName: PropTypes.string,
  children: PropTypes.node,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  })
};

const defaultProps = {
  baseClassName: 'c-form'
};

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.forgotPasswordForm.elements);

    const host = window.location.host;
    const protocol = window.location.protocol;

    const params = {
      ...values,
      redirect_url: `${protocol}//${host}/reset-password`
    };

    return this.props.actions.authentication
      .requestPasswordReset(params)
      .then(() => {
        this.props.router.replace({ pathname: '/' });
      });
  }

  render() {
    return (
      <form
        className={this.props.baseClassName}
        ref={(form) => { this.forgotPasswordForm = form; }}
        onSubmit={this.handleSubmit}
      >
        <label className={`${this.props.baseClassName}__title`} htmlFor="email">
          Email
          <input className={`${this.props.baseClassName}__field`} name="email" type="text" />
        </label>
        {this.props.children &&
          cloneElement(this.props.children, this.props)}
        <input className={`${this.props.baseClassName}__button`} type="submit" value="Reset Password" />
      </form>
    );
  }
}

ForgotPassword.propTypes = propTypes;
ForgotPassword.defaultProps = defaultProps;

export default ForgotPassword;
