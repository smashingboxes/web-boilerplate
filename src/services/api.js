import axios from 'axios';

function init() {
  const api = axios.create();
  // Transforms and interceptors can go here
  return api;
}

export default init();
