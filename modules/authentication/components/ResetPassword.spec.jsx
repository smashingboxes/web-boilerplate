import React from 'react';
import ResetPassword from './ResetPassword';

describe('<ResetPassword />', function() {
  let props;

  beforeEach(function() {
    this.sandbox = sandbox.create();
    props = {
      actions: {
        authentication: {
          resetPassword: this.sandbox.spy(() => Promise.resolve())
        }
      },
      location: {
        query: {
          client_id: faker.internet.password(),
          token: faker.internet.password(),
          uid: faker.internet.password()
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
    let resetPassword;

    beforeEach(function() {
      resetPassword = shallow(<ResetPassword {...props} />);
    });

    it('binds handleSubmit to the current instance', function() {
      expect(resetPassword.instance().handleSubmit.name).to.equal('bound handleSubmit');
    });
  });

  describe('handleSubmit', function() {
    let preventDefault;

    beforeEach(function() {
      preventDefault = this.sandbox.stub();
    });

    context('all form fields filled out', function() {
      let elements;
      let expectedCredentials;
      let promise;

      beforeEach(function() {
        expectedCredentials = {
          password: faker.internet.password(),
          password_confirmation: faker.internet.password()
        };
        elements = Object.keys(expectedCredentials).map((key) => {
          return { name: key, value: expectedCredentials[key] };
        });

        const resetPassword = shallow(<ResetPassword {...props} />);
        resetPassword.instance().resetPasswordForm = { elements };
        promise = resetPassword.instance().handleSubmit({ preventDefault });
      });

      it('prevents the default browser form submission from occurring', function() {
        expect(preventDefault.calledOnce).to.be.true;
      });

      it('resets the password', function() {
        expect(props.actions.authentication.resetPassword.calledOnce).to.be.true;
      });

      it('sends all credentials included in the form when resetting a password', function() {
        expectedCredentials['access-token'] = props.location.query.token;
        expectedCredentials.client = props.location.query.client_id;
        expectedCredentials.uid = props.location.query.uid;
        const [credentials] = props.actions.authentication.resetPassword.firstCall.args;
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
          password: faker.internet.password(),
          password_confirmation: faker.internet.password(),
          ['access-token']: props.location.query.token,
          client: props.location.query.client_id,
          uid: props.location.query.uid
        };
        const elements = [
          { name: 'password', value: expectedCredentials.password },
          { name: 'password_confirmation', value: expectedCredentials.password_confirmation },
          { value: faker.hacker.phrase() }
        ];

        const resetPassword = shallow(<ResetPassword {...props} />);
        resetPassword.instance().resetPasswordForm = { elements };
        resetPassword.instance().handleSubmit({ preventDefault });

        const [credentials] = props.actions.authentication.resetPassword.firstCall.args;
        expect(credentials).to.deep.equal(expectedCredentials);
      });

      it('does not include the form field in the credentials when there is no value for the field', function() {
        const expectedCredentials = {
          password: faker.internet.password(),
          password_confirmation: faker.internet.password(),
          ['access-token']: props.location.query.token,
          client: props.location.query.client_id,
          uid: props.location.query.uid
        };
        const elements = [
          { name: 'password', value: expectedCredentials.password },
          { name: 'password_confirmation', value: expectedCredentials.password_confirmation },
          { name: faker.hacker.noun() }
        ];

        const resetPassword = shallow(<ResetPassword {...props} />);
        resetPassword.instance().resetPasswordForm = { elements };
        resetPassword.instance().handleSubmit({ preventDefault });

        const [credentials] = props.actions.authentication.resetPassword.firstCall.args;
        expect(credentials).to.deep.equal(expectedCredentials);
      });
    });
  });
});
