import { connect } from 'react-redux';
// import { getFormValues } from 'redux-form/immutable';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    helloWorld: state.get('helloWorld'),
    tokenInfo: state.getIn(['authentication', 'tokenInfo'])
    // name: getFormValues('nameTaker')(state)
  };
}

function mapDispatchToProps(/* dispatch */) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
