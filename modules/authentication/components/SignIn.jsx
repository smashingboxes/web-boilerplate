import React, {
  cloneElement,
  Component
} from 'react';
import PropTypes from 'prop-types';
import mapFormValues from '../utils/mapFormValues';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      signIn: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  baseClassName: PropTypes.string,
  children: PropTypes.node,
  isActive: PropTypes.bool,
  location: PropTypes.shape({
    query: PropTypes.shape({
      next: PropTypes.string
    }).isRequired
  }).isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }),
  tokenInfo: PropTypes.object
};

const defaultProps = {
  baseClassName: 'c-form',
  tokenInfo: {}
};

class SignIn extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.signInForm.elements);

    return this.props.actions.authentication
      .signIn(values)
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
        ref={(form) => { this.signInForm = form; }}
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
        {this.props.children &&
          cloneElement(this.props.children, this.props)}
        <input className={`${this.props.baseClassName}__button`} type="submit" value="Sign In" />
      </form>
    );
  }
}

SignIn.propTypes = propTypes;
SignIn.defaultProps = defaultProps;

export default SignIn;
