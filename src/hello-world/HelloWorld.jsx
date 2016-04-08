import React from 'react';
import {connect} from 'react-redux';

import Greeting from './Greeting';
import NameTaker from './NameTaker';

import {setName} from './helloWorldActions';

const App = ({name, onSubmit}) => {
  return (
    <div>
      <Greeting name={name} />
      <NameTaker name={name} onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.helloWorld
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (name) => {
      dispatch(setName(name));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
