import { createSelector } from 'reselect';
import Immutable from 'immutable';
import { VALID_TOKEN_INFO_FIELDS } from '../../modules/authentication/constants';

function getTokenInfoKeys(state) {
  return state.getIn(['authentication', 'tokenInfo'], Immutable.Map());
}

function isUserAuthorized(tokenInfo) {
  return VALID_TOKEN_INFO_FIELDS.filter((field) => {
    return tokenInfo.get(field, null);
  }).length === VALID_TOKEN_INFO_FIELDS.length;
}

export default createSelector(getTokenInfoKeys, isUserAuthorized);
