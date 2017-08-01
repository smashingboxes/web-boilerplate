import * as redux from 'redux';
import * as authenticationActionCreators from '../actions';
import {
  mapDispatchToProps
} from './SignOut';

describe('SignOut container', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
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
