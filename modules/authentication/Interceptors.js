import {
  clearHeaders,
  updateTokenInfo
} from './actions';
import {
  VALID_TOKEN_INFO_FIELDS
} from './constants';

class Interceptors {
  constructor(store) {
    this.store = store;
  }

  addAuthenticationHeaders(config) {
    return this.store
      .getHydratedState()
      .then((state) => {
        const tokenInfoFields = Object.keys(state.authentication.tokenInfo);

        tokenInfoFields.reduce((memo, field) => {
          memo[field] = state.authentication.tokenInfo[field];
          return memo;
        }, config.headers.common);

        return config;
      });
  }

  invalidateHeaders(error) {
    if (error.response.status === 401) {
      const store = this.store.getStore();
      store.dispatch(clearHeaders());
    } else {
      this.saveTokenInfo(error.response);
    }

    throw error;
  }

  isNewToken(newExpiry) {
    return this.store.getHydratedState()
      .then((state) => {
        const oldExpiry = state.authentication.tokenInfo.expiry;
        const isNewerToken = !oldExpiry || (newExpiry && (newExpiry > oldExpiry));

        return isNewerToken;
      });
  }

  parseTokenInfoFromHeaders(headers) {
    return VALID_TOKEN_INFO_FIELDS.reduce((memo, header) => {
      if (headers[header]) {
        memo[header] = headers[header];
      }

      return memo;
    }, {});
  }

  saveTokenInfo(response) {
    const tokenInfo = this.parseTokenInfoFromHeaders(response.headers);

    if (Object.keys(tokenInfo).length) {
      return this.isNewToken(tokenInfo.expiry)
        .then((isNewToken) => {
          if (isNewToken) {
            this.store.getStore().dispatch(updateTokenInfo(tokenInfo));
          }

          return response;
        });
    }

    return response;
  }
}

export default Interceptors;
