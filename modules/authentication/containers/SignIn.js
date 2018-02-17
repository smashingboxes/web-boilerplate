import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import * as authenticationActions from '../actions';
import SignIn from '../components/SignIn';

function mapStateToProps(state) {
  return {
    isActive: state.getIn(['authentication', 'isActive']),
    tokenInfo: state.getIn(['authentication', 'tokenInfo'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      authentication: bindActionCreators(authenticationActions, dispatch)
    }
  };
}

export {
  mapStateToProps,
  mapDispatchToProps
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
