import React, {
  cloneElement,
  Component,
  PropTypes
} from 'react';

const propTypes = {
  actions: PropTypes.shape({
    authentication: PropTypes.shape({
      signIn: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  children: PropTypes.node,
  isActive: PropTypes.bool,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  })
};

class SignIn extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isActive && !nextProps.isActive) {
      const query = { ...nextProps.location.query };

      if (query.next) {
        delete query.next;
      }

      this.props.router.replace({
        query,
        pathname: nextProps.location.query.next ? nextProps.location.query.next : '/'
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const values = Array.prototype.reduce.call(this.signInForm.elements, (memo, element) => {
      if (element.name && element.value) {
        memo[element.name] = element.value;
      }

      return memo;
    }, {});

    this.props.actions.authentication.signIn(values);
  }

  render() {
    return (
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
    );
  }
}

SignIn.propTypes = propTypes;

export default SignIn;
