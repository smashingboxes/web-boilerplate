import React from 'react';
import SignOut from './SignOut';

describe('<SignOut />', function() {
  let props;

  beforeEach(function() {
    this.sandbox = sandbox.create();
    props = {
      actions: {
        authentication: {
          signOut: this.sandbox.stub()
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

  describe('handleSignOut', function() {
    let signOut;

    beforeEach(function() {
      signOut = shallow(<SignOut {...props} />);
      signOut.prop('onClick')();
    });

    it('signs the user out', function() {
      expect(props.actions.authentication.signOut.calledOnce).to.be.true;
    });

    it('navigates to the sign in link', function() {
      expect(props.router.push.calledOnce).to.be.true;
      const [endpoint] = props.router.push.firstCall.args;
      expect(endpoint).to.equal('/sign-in');
    });
  });
});
