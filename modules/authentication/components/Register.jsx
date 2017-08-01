import React, {
  cloneElement,
  Component,
  PropTypes
} from 'react';
import mapFormValues from '../utils/mapFormValues';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      register: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  baseClassName: PropTypes.string,
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

class Register extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.registerForm.elements);

    const host = window.location.host;
    const protocol = window.location.protocol;

    const params = {
      ...values,
      confirm_success_url: `${protocol}//${host}/registration-confirmed`
    };

    return this.props.actions.authentication
      .register(params)
      .then(() => this.transitionToNextPage());
  }

  transitionToNextPage() {
    const query = { ...this.props.location.query };

    if (query.next) {
      delete query.next;
    }

    this.props.router.replace({
      query,
      pathname: this.props.location.query.next || '/'
    });
  }

  render() {
    return (
      <form
        className={this.props.baseClassName}
        ref={(form) => { this.registerForm = form; }}
        onSubmit={this.handleSubmit}
      >
        <label className={`${this.props.baseClassName}__title`} htmlFor="email">
          Email
          <input className={`${this.props.baseClassName}__field`} name="email" type="text" />
        </label>
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

Register.propTypes = propTypes;

export default Register;
