import actionTypes from '../constants/actionTypes';

function setName(name) {
  return {
    type: actionTypes.SET_NAME,
    payload: {
      name
    }
  };
}

module.exports = {
  setName
};
