import { combineReducers } from 'redux-immutable';
import authentication from '../../modules/authentication/reducer';
import helloWorld from './helloWorldReducer';

export default combineReducers({
  authentication,
  helloWorld
});
