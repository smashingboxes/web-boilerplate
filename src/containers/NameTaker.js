import {
  connect
} from 'react-redux';
import {
  compose
} from 'redux';
import {
  getFormValues,
  reduxForm
} from 'redux-form/immutable';

import { setName } from '../actions/helloWorldActions';
import NameTaker from '../components/NameTaker';

const formName = 'nameTaker';

function mapStateToProps(state) {
  return {
    formValues: getFormValues(formName)(state),
    initialValues: { }
  };
}

function mapDispatchToProps(/* dispatch */) {
  return {
    actions: { }
  };
}

function handleSubmit(values, dispatch /* , props */) {
  dispatch(setName(values.name));
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: formName,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
  })
)(NameTaker);
