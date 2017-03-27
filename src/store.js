import CookieStorage from 'redux-persist-cookie-storage';
import reducers from './reducers';
import StoreService from '../modules/authentication/services/store';

const store = new StoreService(reducers, new CookieStorage({ cookies: {} }));
export default store;
