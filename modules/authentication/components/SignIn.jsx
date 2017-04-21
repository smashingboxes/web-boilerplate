import React, {
  cloneElement,
  Component,
  PropTypes
} from 'react';
import {
  Link
} from 'react-router';
import mapFormValues from '../utils/mapFormValues';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      signIn: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
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
      <div>
        <form ref={(form) => { this.signInForm = form; }} onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            Email
            <input name="email" type="text" />
          </label>
          <label htmlFor="password">
            Password
            <input name="password" type="password" />
          </label>
          {this.props.children &&
            cloneElement(this.props.children, this.props)}
          <input type="submit" value="Sign In" />
        </form>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

SignIn.propTypes = propTypes;
SignIn.defaultProps = defaultProps;

export default SignIn;
