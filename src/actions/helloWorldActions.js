function setName(name) {
  return {
    type: 'SET_NAME',
    payload: {
      name
    }
  };
}

module.exports = {
  setName
};
