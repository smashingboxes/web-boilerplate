import apiService from '../../../src/services/api';

function requestPasswordReset(params) {
  return apiService
    .post('/auth/password', params)
    .then(({ data }) => {
      return {
        response: data.message
      };
    })
    .catch((err) => {
      let errorMessage = 'There was a problem requesting a password reset token.';

      if (err.response.status === 404) {
        errorMessage = `Could not find existing user ${params.email}`;
      }

      throw new Error(errorMessage);
    });
}

function resetPassword(params) {
  return apiService
    .put('/auth/password', params)
    .then(({ data }) => {
      return {
        email: data.email,
        id: data.id,
        name: data.name
      };
    })
    .catch(() => {
      const errorMessage = 'There was a problem reseting your password. Please try again.';
      throw new Error(errorMessage);
    });
}

function signIn(email, password) {
  return apiService
    .post('/auth/signin', { email, password })
    .then(({ data }) => {
      return {
        email: data.email,
        id: data.id,
        name: data.name
      };
    })
    .catch((err) => {
      let errorMessage = 'There was a problem signing in. Please try again.';

      if (err.response.status === 401) {
        errorMessage = 'Your credentials could not be verified. Please try again.';
      }

      throw new Error(errorMessage);
    });
}

export default {
  requestPasswordReset,
  resetPassword,
  signIn
};
