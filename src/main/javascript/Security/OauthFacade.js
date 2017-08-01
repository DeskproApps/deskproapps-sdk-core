import * as Events from './Events';
import {OauthToken} from './OauthToken';
import {OauthConnection} from './OauthConnection';

export class OauthFacade
{
  /**
   * @param {EventDispatcher} eventDispatcher
   * @param {function} setState
   * @param {String} appId
   * @param {String} helpdeskUrl
   */
  constructor(eventDispatcher, setState, { appId, helpdeskUrl })
  {
    this.props = { eventDispatcher, setState, appId, helpdeskUrl };
  }

  /**
   * @param {String} provider
   * @return {Promise}
   */
  settings = (provider) =>
  {
    const { eventDispatcher } = this.props;
    return eventDispatcher.emitAsync(Events.EVENT_SECURITY_SETTINGS_OAUTH, { provider });
  };

  /**
   * @param {String} provider
   * @param {{ urlAuthorize:String, urlAccessToken:String, urlAccessToken:String, urlResourceOwnerDetails:String, clientId:String, clientSecret:String }}  details
   * @return {*}
   */
  register = (provider, details) => {
    const connectionProps = { ...details, providerName: provider };
    const connectionJS = OauthConnection.fromJS(connectionProps).toJS();

    const stateName = `oauth:${provider}`;
    return this.props.setState(stateName, connectionJS).then(() => ({ name: stateName, value: connectionJS }));
  };

  /**
   * @param provider
   * @param options
   * @return {Promise}
   */
  access = (provider, options) => {
    const { eventDispatcher } = this.props;
    return eventDispatcher
      .emitAsync(Events.EVENT_SECURITY_AUTHENTICATE_OAUTH, { provider, options })
      .then(OauthToken.fromOauthProxyResponse)
      .then(oauthToken => oauthToken.toJS())
    ;
  };
}