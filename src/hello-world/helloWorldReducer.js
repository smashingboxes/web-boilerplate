import {SET_NAME} from './helloWorldConstants';

const INITIAL_STATE = {
  name: 'World'
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_NAME:
    return {
      ...state,
      name: action.name
    };
  default:
    return state;
  }
};

export default reducer;
