import React, {Component} from 'react';

import './_hello-world.scss';

export default class HelloWorld extends Component {
  render() {
    return (
      <div className="hello-world">
        <div className="hello-world__icon"></div>
        Hello, World
      </div>
    );
  }
}
