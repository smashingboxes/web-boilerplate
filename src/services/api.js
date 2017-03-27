import axios from 'axios';
import {
  addAuthenticationHeaders,
  invalidateHeaders
} from '../../modules/authentication/interceptors';

function init() {
  const api = axios.create();

  // Transforms and interceptors can go here
  api.interceptors.request.use(addAuthenticationHeaders);
  api.interceptors.response.use((res) => res, invalidateHeaders);

  return api;
}

export {
  init
};

export default init();
