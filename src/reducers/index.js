import { combineReducers } from 'redux';
import authentication from '../../modules/authentication/reducer';
import helloWorld from './helloWorldReducer';

export default combineReducers({
  authentication,
  helloWorld
});
