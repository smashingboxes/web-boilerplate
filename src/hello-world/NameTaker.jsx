import React, {Component, PropTypes} from 'react';

export default class NameTaker extends Component {
  componentDidMount() {
    this.refs.name.focus();
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.refs.name.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="name">Name</label>
          <input ref="name" id="name" type="text" defaultValue={this.props.name} />

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
