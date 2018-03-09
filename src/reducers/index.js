import { combineReducers } from 'redux-immutable';
// import { reducer as formReducer } from 'redux-form/immutable';
import authentication from '../../modules/authentication/reducer';
import helloWorld from './helloWorldReducer';

export default combineReducers({
  authentication,
  helloWorld
  // form: formReducer
});
