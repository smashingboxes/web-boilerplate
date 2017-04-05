import React from 'react';
import ForgotPassword from './ForgotPassword';

describe('<ForgotPassword />', function() {
  let props;

  beforeEach(function() {
    this.sandbox = sandbox.create();
    props = {
      actions: {
        authentication: {
          requestPasswordReset: this.sandbox.spy(() => Promise.resolve())
        }
      },
      router: {
        replace: this.sandbox.spy(() => '/')
      }
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('constructor', function() {
    let forgotPassword;

    beforeEach(function() {
      forgotPassword = shallow(<ForgotPassword {...props} />);
    });

    it('binds handleSubmit to the current instance', function() {
      expect(forgotPassword.instance().handleSubmit.name).to.equal('bound handleSubmit');
    });
  });

  describe('handleSubmit', function() {
    let preventDefault;
    let expectedOrigin;

    beforeEach(function() {
      expectedOrigin = 'foo.com';
      global.window = { location: { origin: expectedOrigin } };
      preventDefault = this.sandbox.stub();
    });

    context('all form fields filled out', function() {
      let elements;
      let expectedCredentials;
      let promise;

      beforeEach(function() {
        expectedCredentials = {
          email: faker.internet.email(),
          redirect_url: expectedOrigin,
          [faker.hacker.noun()]: faker.hacker.phrase(),
          [faker.hacker.noun()]: faker.hacker.phrase(),
          [faker.hacker.noun()]: faker.hacker.phrase()
        };
        elements = Object.keys(expectedCredentials).map((key) => {
          return { name: key, value: expectedCredentials[key] };
        });

        const forgotPassword = shallow(<ForgotPassword {...props} />);
        forgotPassword.instance().forgotPasswordForm = { elements };
        promise = forgotPassword.instance().handleSubmit({ preventDefault });
      });

      it('prevents the default browser form submission from occurring', function() {
        expect(preventDefault.calledOnce).to.be.true;
      });

      it('requests a password reset', function() {
        expect(props.actions.authentication.requestPasswordReset.calledOnce).to.be.true;
      });

      it('sends all credentials included in the form when requesting a password reset', function() {
        const [credentials] = props.actions.authentication.requestPasswordReset.firstCall.args;
        expect(credentials).to.deep.equal(expectedCredentials);
      });

      it('transitions to the next page after the request completes', function() {
        return promise.then(() => {
          expect(props.router.replace.calledOnce).to.be.true;
          const [{ pathname }] = props.router.replace.firstCall.args;
          expect(pathname).to.equal('/');
        });
      });
    });

    context('form fields are missing information', function() {
      it('does not include the form field in the credentials when there is no name for the field', function() {
        const expectedCredentials = {
          email: faker.internet.email(),
          redirect_url: expectedOrigin
        };
        const elements = [
          { name: 'email', value: expectedCredentials.email },
          { value: faker.hacker.phrase() }
        ];

        const forgotPassword = shallow(<ForgotPassword {...props} />);
        forgotPassword.instance().forgotPasswordForm = { elements };
        forgotPassword.instance().handleSubmit({ preventDefault });

        const [credentials] = props.actions.authentication.requestPasswordReset.firstCall.args;
        expect(credentials).to.deep.equal(expectedCredentials);
      });

      it('does not include the form field in the credentials when there is no value for the field', function() {
        const expectedCredentials = {
          email: faker.internet.email(),
          redirect_url: expectedOrigin
        };
        const elements = [
          { name: 'email', value: expectedCredentials.email },
          { name: faker.hacker.noun() }
        ];

        const forgotPassword = shallow(<ForgotPassword {...props} />);
        forgotPassword.instance().forgotPasswordForm = { elements };
        forgotPassword.instance().handleSubmit({ preventDefault });

        const [credentials] = props.actions.authentication.requestPasswordReset.firstCall.args;
        expect(credentials).to.deep.equal(expectedCredentials);
      });
    });
  });
});
