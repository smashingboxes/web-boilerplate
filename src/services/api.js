import axios from 'axios';
import Interceptors from '../../modules/authentication/Interceptors';
import store from '../store';

const interceptors = new Interceptors(store);

function init() {
  const api = axios.create({ baseURL: '/api' });

  // Transforms and interceptors can go here
  api.interceptors.request.use(interceptors.addAuthenticationHeaders.bind(interceptors));
  api.interceptors.request.use(interceptors.addAuthenticationHeaders.bind(interceptors));
  api.interceptors.response.use(
    interceptors.saveTokenInfo.bind(interceptors),
    interceptors.invalidateHeaders.bind(interceptors)
  );

  return api;
}

export {
  init
};

export default init();
