import * as Events from './events';
import OauthToken from './OauthToken';
// import OauthConnection from './OauthConnection';

const defaultProtocolVersion = '2.0';

/**
 * @class
 */
class OauthFacade
{
  /**
   * @param {AppEventEmitter} eventDispatcher the outgoing events dispatcher
   * @param {function} setStorage
   */
  constructor(eventDispatcher, setStorage )
  {
    this.props = { eventDispatcher, setStorage };
  }

  /**
   * Returns a map of settings required to register a client with `provider`. If `protocolVersion` is not specified in `options` then it defaults to `2.0`
   *
   * @method
   *
   * @param {String} provider the id of the provider
   * @param {{protocolVersion:String}} [options] a map of properties describing the oauth client. Only `protocolVersion` is supported for the moment
   *
   * @returns {Promise<OauthClientSettings, Error>}
   */
  async settings(provider, options)
  {
    const { eventDispatcher } = this.props;
    let eventOptions = null;

   if (typeof options === 'object') {
     eventOptions = { protocolVersion: defaultProtocolVersion, ...options, provider };
    } else {
     eventOptions = { provider, protocolVersion: defaultProtocolVersion };
    }

    if (eventOptions) {
      return eventDispatcher.emitAsync(Events.EVENT_SECURITY_SETTINGS_OAUTH, eventOptions);
    }

    return Promise.reject(new Error('invalid argument'));
  };

  /**
   * Registers an oauth connection for a specific provider
   *
   * @method
   *
   * @param {String} provider the provider id
   * @param {OauthConnectionProperties} properties the connection properties
   * @return {Promise<OauthConnectionRegistrationResponse, Error>}
   */
  async register(provider, properties)
  {
    const connectionProps = { ...properties, providerName: provider };
    const connectionJS = OauthConnection.fromJS(connectionProps).toJS();

    const storageName = `oauth:${provider}`;
    return this.props.setStorage(storageName, connectionJS).then(() => ({ name: storageName, value: connectionJS }));
  };

  /**
   * Alias for OauthFacade.requestAccess
   *
   * @param {string} provider the provider id
   * @param {{protocolVersion:String}} [options] a map of properties describing the oauth client. Only `protocolVersion` is supported for the moment
   * @internal
   * @deprecated
   * @returns {Promise.<OauthToken, Error>}
   */
  async access(provider, options)
  {
    return this.requestAccess(provider, options);
  }

  /**
   * Requests an access token. If `protocolVersion` is not specified in `options` then it defaults to `2.0`
   *
   * @method
   *
   * @param {string} provider the provider id
   * @param {{protocolVersion:String}} [options] a map of properties describing the oauth client. Only `protocolVersion` is supported for the moment
   * @return {Promise<OauthToken, Error>}
   */
  async requestAccess(provider, options)
  {
    let eventOptions = null;
    if (typeof options === 'object') {
      eventOptions = { ...options, provider };
    } else {
      eventOptions = { provider, protocolVersion: defaultProtocolVersion };
    }

    const { eventDispatcher } = this.props;
    return eventDispatcher
      .emitAsync(Events.EVENT_SECURITY_AUTHENTICATE_OAUTH, eventOptions)
      .then(OauthToken.fromOauthProxyResponse)
      .then(oauthToken => oauthToken.toJS())
    ;
  };
}

export default OauthFacade

/**
 * Represents the result of registering an oauth connection
 *
 * @typedef {Object} OauthConnectionRegistrationResponse
 * @property {string} name the key to access the connection data from storage
 * @property {OauthConnection} value the oauth connection
 */

/**
 * Represents the information required to register client with an oauth provider
 *
 * @typedef {Object} OauthClientSettings
 * @property {string} urlRedirect
 */

/**
 * Represents the information required to setup an oauth connection with a provider
 *
 * @typedef {Object} OauthConnectionProperties
 * @property {String} urlAuthorize the url of the authorize endpoint
 * @property {String} urlAccessToken the url of the token endpoint
 * @property {String} urlRedirect the url the oauth provider will redirect the browser after the user grants access
 * @property {string} [urlResourceOwnerDetails]
 * @property {String} clientId the id of the client registered with the oauth provider
 * @property {string} [clientSecret] an optional client secret
 * @property {Array<string>} [scopes] an optional list of scopes
 */