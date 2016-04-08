import {SET_NAME} from './helloWorldConstants';

export const setName = (name) => {
  return {
    type: SET_NAME,
    name
  };
};
