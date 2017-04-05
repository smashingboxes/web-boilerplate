import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import * as authenticationActions from '../actions';
import Register from '../components/Register';

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
export default connect(null, mapDispatchToProps)(Register);
