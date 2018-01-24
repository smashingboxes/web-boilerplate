import { persistCombineReducers } from 'redux-persist';
import authentication from '../../modules/authentication/reducer';
import helloWorld from './helloWorldReducer';
import store from '../store';

console.log('Test', store);

const config = {
  storage: store.getStorage(),
  whitelist: ['authentication']
};

export default persistCombineReducers(
  config,
  {
    authentication,
    helloWorld
  }
);
