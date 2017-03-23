import apiService from '../../../src/services/api';

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
  signIn
};
