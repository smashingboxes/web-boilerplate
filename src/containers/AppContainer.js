import { connect } from 'react-redux';
import { setName } from '../actions/helloWorldActions';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    ...state.helloWorld
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
