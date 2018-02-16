import { connect } from 'react-redux';
import { setName } from '../actions/helloWorldActions';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    helloWorld: state.get('helloWorld'),
    tokenInfo: state.authentication.tokenInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(name) {
      dispatch(setName(name));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
