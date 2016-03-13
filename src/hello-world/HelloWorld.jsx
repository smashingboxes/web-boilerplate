import React, {PropTypes} from 'react';

import './_hello-world.scss';

const HelloWorld = ({name}) => {
  return (
    <div className="hello-world">
      <div className="hello-world__icon"></div>
      Hello, {name}
    </div>
  );
};

HelloWorld.propTypes = {
  name: PropTypes.string
};

HelloWorld.defaultProps = {
  name: 'World'
};

export default HelloWorld;
