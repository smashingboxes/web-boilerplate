import { combineReducers } from 'redux-immutable';
import authentication from '../../modules/authentication/reducer';
import helloWorld from './helloWorldReducer';
import persist from './persist';

export default combineReducers({
  authentication,
  helloWorld,
  persist
});
