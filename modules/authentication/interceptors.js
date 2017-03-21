function addAuthenticationHeaders(config) {
  return config;
}

function invalidateHeaders(error) {
  throw error;
}

export {
  addAuthenticationHeaders,
  invalidateHeaders
};
