import * as Events from './Events';
import {OauthToken} from './OauthToken';
import {OauthConnection} from './OauthConnection';

const defaultProtocolVersion = '2.0';

/**
 * @class
 */
export class OauthFacade
{
  /**
   * @param {EventDispatcher} eventDispatcher
   * @param {function} setStorage
   */
  constructor(eventDispatcher, setStorage )
  {
    this.props = { eventDispatcher, setStorage };
  }

  /**
   * @method
   *
   * @return {Promise}
   * @param {String} provider
   * @param options
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

    return Promise.reject('invalid argument');
  };

  /**
   * @method
   *
   * @param {String} provider
   * @param {{ urlAuthorize:String, urlAccessToken:String, urlAccessToken:String, urlResourceOwnerDetails:String, clientId:String, clientSecret:String }}  details
   * @return {Promise}
   */
  async register(provider, details)
  {
    const connectionProps = { ...details, providerName: provider };
    const connectionJS = OauthConnection.fromJS(connectionProps).toJS();

    const storageName = `oauth:${provider}`;
    return this.props.setStorage(storageName, connectionJS).then(() => ({ name: storageName, value: connectionJS }));
  };

  /**
   * @method
   *
   * @param provider
   * @param options
   * @return {Promise}
   */
  async access(provider, options)
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