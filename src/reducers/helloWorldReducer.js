const INITIAL_STATE = {
  name: 'World'
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_NAME':
    return {
      ...state,
      name: action.payload.name
    };
  default:
    return state;
  }
}

export default reducer;
