import React, { Component, PropTypes } from 'react';

export default class NameTaker extends Component {
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

NameTaker.propTypes = {
  name: PropTypes.string,
  onSubmit: PropTypes.func
};

NameTaker.defaultProps = {
  name: 'World',
  onSubmit: () => {}
};
