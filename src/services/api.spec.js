import * as apiService from './api';
import {
  addAuthenticationHeaders,
  invalidateHeaders
} from '../../modules/authentication/interceptors';

describe('API service', function() {
  describe('init', function() {
    let api;

    beforeEach(function() {
      api = apiService.init();
    });

    it('uses addAuthenticationHeaders as a request middleware', function() {
      expect(api.interceptors.request.handlers[0].fulfilled).to.equal(addAuthenticationHeaders);
    });

    it('uses invalidateHeaders as a response middleware', function() {
      expect(api.interceptors.response.handlers[0].rejected).to.equal(invalidateHeaders);
    });

    it("has all of Axios's request methods", function() {
      expect(api).to.contain.all.keys(['request', 'get', 'delete', 'head', 'post', 'put', 'patch']);
    });
  });
});
