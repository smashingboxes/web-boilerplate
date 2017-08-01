import * as redux from 'redux';
import * as authenticationActionCreators from '../actions';
import {
  mapDispatchToProps,
  mapStateToProps
} from './SignIn';
import {
  VALID_TOKEN_INFO_FIELDS
} from '../constants';

describe('SignIn container', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('mapStateToProps', function() {
    let authenticationState;
    let props;

    beforeEach(function() {
      authenticationState = {
        isActive: faker.random.boolean(),
        tokenInfo: VALID_TOKEN_INFO_FIELDS.reduce((memo, field) => {
          memo[field] = faker.internet.password();
          return memo;
        }, {})
      };
      props = mapStateToProps({
        authentication: authenticationState
      });
    });

    it('maps the sign in activity state to the props', function() {
      expect(props.isActive).to.equal(authenticationState.isActive);
    });

    it('maps the token info to the props', function() {
      expect(props.tokenInfo).to.equal(authenticationState.tokenInfo);
    });
  });

  describe('mapDispatchToProps', function() {
    let bindActionCreators;
    let expectedActionCreators;
    let expectedDispatch;
    let props;

    beforeEach(function() {
      expectedActionCreators = { [faker.lorem.word()]: this.sandbox.stub() };
      bindActionCreators = this.sandbox.stub(redux, 'bindActionCreators').returns(expectedActionCreators);
      expectedDispatch = this.sandbox.stub();
      props = mapDispatchToProps(expectedDispatch);
    });

    it('binds the authentication action creators to the props', function() {
      expect(bindActionCreators.called).to.be.true;
      const [actionCreators, dispatch] = bindActionCreators.firstCall.args;
      expect(actionCreators).to.equal(authenticationActionCreators);
      expect(dispatch).to.equal(expectedDispatch);
      expect(props.actions.authentication).to.equal(expectedActionCreators);
    });
  });
});
