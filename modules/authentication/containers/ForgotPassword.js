import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import * as authenticationActions from '../actions';
import ForgotPassword from '../components/ForgotPassword';

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      authentication: bindActionCreators(authenticationActions, dispatch)
    }
  };
}

export {
  mapDispatchToProps
};
export default connect(null, mapDispatchToProps)(ForgotPassword);
