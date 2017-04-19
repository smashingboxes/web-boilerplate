import React from 'react';
import RegistrationConfirmed from './RegistrationConfirmed';

describe('<RegistrationConfirmed />', function() {
  let props;

  beforeEach(function() {
    this.sandbox = sandbox.create();
    props = {
      actions: {
        authentication: {
          updateTokenInfo: this.sandbox.stub()
        }
      },
      location: {
        query: {
          client_id: faker.internet.password(),
          expiry: faker.internet.password(),
          token: faker.internet.password(),
          uid: faker.internet.password()
        }
      },
      router: {
        push: this.sandbox.stub()
      }
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('componentWillMount', function() {
    let expectedTokenInfo;

    beforeEach(function() {
      expectedTokenInfo = {
        ['access-token']: props.location.query.token,
        client: props.location.query.client_id,
        expiry: props.location.query.expiry,
        ['token-type']: 'Bearer',
        uid: props.location.query.uid
      };
      shallow(<RegistrationConfirmed {...props} />);
    });

    it('calls updateTokenInfo', function() {
      const updateTokenInfo = props.actions.authentication.updateTokenInfo;
      expect(updateTokenInfo.calledOnce).to.be.true;
      const [tokenInfo] = updateTokenInfo.firstCall.args;
      expect(tokenInfo).to.deep.eq(expectedTokenInfo);
    });

    it('pushes to the homepage', function() {
      const push = props.router.push;
      expect(push.calledOnce).to.be.true;
      const [url] = push.firstCall.args;
      expect(url).to.eq('/');
    });
  });
});
