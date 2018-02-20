import Immutable from 'immutable';
import isUserAuthorized from './isUserAuthorized';
import { VALID_TOKEN_INFO_FIELDS } from '../../modules/authentication/constants';

describe('selectors/isUserAuthorized', function() {
  it('returns true if the user has values in the valid token info fields', function() {
    const validInfoFields = VALID_TOKEN_INFO_FIELDS.reduce((fields, field) => {
      fields[field] = faker.lorem.word();
      return fields;
    }, {});

    const state = Immutable.fromJS({
      authentication: {
        tokenInfo: validInfoFields
      }
    });

    const isAuthorized = isUserAuthorized(state);

    expect(isAuthorized).to.be.true;
  });

  it('returns false if any of the fields are missing a value', function() {
    const randomIndex = Math.floor(Math.random() * VALID_TOKEN_INFO_FIELDS.length);
    const validInfoFields = VALID_TOKEN_INFO_FIELDS.reduce((fields, field, index) => {
      fields[field] = index !== randomIndex ? faker.lorem.word() : null;
      return fields;
    }, {});

    const state = Immutable.fromJS({
      authentication: {
        tokenInfo: validInfoFields
      }
    });

    const isAuthorized = isUserAuthorized(state);

    expect(isAuthorized).to.be.false;
  });
});
