import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

const defaultProps = {
  name: 'World',
  onSubmit() {}
};

class NameTaker extends Component {
  componentDidMount() {
    this.nameInput.focus();
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.nameInput.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="name">Name</label>
          <input
            defaultValue={this.props.name}
            id="name"
            ref={(input) => { this.nameInput = input; }}
            type="text"
          />

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

NameTaker.propTypes = propTypes;

NameTaker.defaultProps = defaultProps;

export default NameTaker;
