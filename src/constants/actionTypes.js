import keyMirror from 'keymirror';
import authenticationActionTypes from '../../modules/authentication/actionTypes';

const actionTypes = Object.assign({}, authenticationActionTypes);

export default keyMirror(actionTypes);
