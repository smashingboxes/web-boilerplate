import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import * as authenticationActions from '../actions';
import ResetPassword from '../components/ResetPassword';

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
export default connect(null, mapDispatchToProps)(ResetPassword);
