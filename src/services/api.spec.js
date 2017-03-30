import * as apiService from './api';
import Interceptors from '../../modules/authentication/Interceptors';

describe('API service', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('init', function() {
    let addAuthenticationHeaders;
    let api;
    let invalidateHeaders;
    let saveTokenInfo;

    beforeEach(function() {
      addAuthenticationHeaders = this.sandbox.stub(Interceptors.prototype, 'addAuthenticationHeaders');
      invalidateHeaders = this.sandbox.stub(Interceptors.prototype, 'invalidateHeaders');
      saveTokenInfo = this.sandbox.stub(Interceptors.prototype, 'saveTokenInfo');

      api = apiService.init();
    });

    it('uses addAuthenticationHeaders as a request middleware', function() {
      api.interceptors.request.handlers[0].fulfilled();
      expect(addAuthenticationHeaders.calledOnce).to.be.true;
    });

    it('uses saveTokenInfo as success response middleware', function() {
      api.interceptors.response.handlers[0].fulfilled();
      expect(saveTokenInfo.calledOnce).to.be.true;
    });

    it('uses invalidateHeaders as an error response middleware', function() {
      api.interceptors.response.handlers[0].rejected();
      expect(invalidateHeaders.calledOnce).to.be.true;
    });

    it("has all of Axios's request methods", function() {
      expect(api).to.contain.all.keys(['request', 'get', 'delete', 'head', 'post', 'put', 'patch']);
    });
  });
});
