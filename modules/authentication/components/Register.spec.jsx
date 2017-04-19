import React from 'react';
import Register from './Register';

describe('<Register />', function() {
  let props;

  beforeEach(function() {
    this.sandbox = sandbox.create();
    props = {
      actions: {
        authentication: {
          register: this.sandbox.spy(() => Promise.resolve())
        }
      },
      location: {
        query: {}
      },
      router: {
        replace: this.sandbox.stub()
      }
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('constructor', function() {
    let register;

    beforeEach(function() {
      register = shallow(<Register {...props} />);
    });

    it('binds handleSubmit to the current instance', function() {
      expect(register.instance().handleSubmit.name).to.equal('bound handleSubmit');
    });
  });

  describe('handleSubmit', function() {
    let expectedOrigin;
    let preventDefault;
    let transitionToNextPage;

    beforeEach(function() {
      expectedOrigin = 'foo.com';
      global.window = { location: { origin: expectedOrigin } };
      preventDefault = this.sandbox.stub();
      transitionToNextPage = this.sandbox.stub(Register.prototype, 'transitionToNextPage');
    });

    context('all form fields filled out', function() {
      let elements;
      let expectedCredentials;
      let promise;

      beforeEach(function() {
        expectedCredentials = {
          email: faker.internet.email(),
          password: faker.internet.password(),
          confirm_success_url: `${expectedOrigin}/registration-confirmed`,
          [faker.hacker.noun()]: faker.hacker.phrase(),
          [faker.hacker.noun()]: faker.hacker.phrase(),
          [faker.hacker.noun()]: faker.hacker.phrase()
        };
        elements = Object.keys(expectedCredentials).map((key) => {
          return { name: key, value: expectedCredentials[key] };
        });

        const register = shallow(<Register {...props} />);
        register.instance().registerForm = { elements };
        promise = register.instance().handleSubmit({ preventDefault });
      });

      it('prevents the default browser form submission from occurring', function() {
        expect(preventDefault.calledOnce).to.be.true;
      });

      it('signs the user in', function() {
        expect(props.actions.authentication.register.calledOnce).to.be.true;
      });

      it('sends all credentials included in the form when signing in', function() {
        const [credentials] = props.actions.authentication.register.firstCall.args;
        expect(credentials).to.deep.equal(expectedCredentials);
      });

      it('transitions to the next page after the request completes', function() {
        return promise.then(() => {
          expect(transitionToNextPage.calledOnce).to.be.true;
        });
      });
    });

    context('form fields are missing information', function() {
      it('does not include the form field in the credentials when there is no name for the field', function() {
        const expectedCredentials = {
          email: faker.internet.email(),
          password: faker.internet.password(),
          confirm_success_url: `${expectedOrigin}/registration-confirmed`
        };
        const elements = [
          { name: 'email', value: expectedCredentials.email },
          { name: 'password', value: expectedCredentials.password },
          { value: faker.hacker.phrase() }
        ];

        const register = shallow(<Register {...props} />);
        register.instance().registerForm = { elements };
        register.instance().handleSubmit({ preventDefault });

        const [credentials] = props.actions.authentication.register.firstCall.args;
        expect(credentials).to.deep.equal(expectedCredentials);
      });

      it('does not include the form field in the credentials when there is no value for the field', function() {
        const expectedCredentials = {
          email: faker.internet.email(),
          password: faker.internet.password(),
          confirm_success_url: `${expectedOrigin}/registration-confirmed`
        };
        const elements = [
          { name: 'email', value: expectedCredentials.email },
          { name: 'password', value: expectedCredentials.password },
          { name: faker.hacker.noun() }
        ];

        const register = shallow(<Register {...props} />);
        register.instance().registerForm = { elements };
        register.instance().handleSubmit({ preventDefault });

        const [credentials] = props.actions.authentication.register.firstCall.args;
        expect(credentials).to.deep.equal(expectedCredentials);
      });
    });
  });

  describe('transitionToNextPage', function() {
    it('navigates to the main dashboard', function() {
      const register = shallow(<Register {...props} />);
      register.instance().transitionToNextPage();

      expect(props.router.replace.calledOnce).to.be.true;
      const [{ pathname }] = props.router.replace.firstCall.args;
      expect(pathname).to.equal('/');
    });

    it('navigates to the page the user wanted to see after sign in', function() {
      const expectedUrl = `/user/${faker.random.number()}/edit`;
      const location = {
        query: {
          next: expectedUrl
        }
      };
      const register = shallow(<Register {...props} location={location} />);
      register.instance().transitionToNextPage();

      expect(props.router.replace.calledOnce).to.be.true;
      const [{ pathname }] = props.router.replace.firstCall.args;
      expect(pathname).to.equal(expectedUrl);
    });

    it('carries on query parameters that are not the next path to the next path', function() {
      const expectedUrl = `/user/${faker.random.number()}/edit`;
      const expectedQuery = {
        [faker.hacker.noun()]: faker.hacker.phrase(),
        [faker.hacker.noun()]: faker.hacker.phrase()
      };
      const location = {
        query: {
          ...expectedQuery,
          next: expectedUrl
        }
      };
      const register = shallow(<Register {...props} location={location} />);
      register.instance().transitionToNextPage();

      expect(props.router.replace.calledOnce).to.be.true;
      const [{ query }] = props.router.replace.firstCall.args;
      expect(query).to.deep.equal(expectedQuery);
    });
  });
});
