import * as Events from './Events';
import {OauthToken} from './OauthToken';
import {OauthConnection} from './OauthConnection';

export class OauthFacade
{
  /**
   * @param {EventDispatcher} eventDispatcher
   * @param {function} setState
   */
  constructor(eventDispatcher, setState)
  {
    this.props = { eventDispatcher, setState };
  }

  /**
   * @param {String} provider
   * @param {{ urlAuthorize:String, urlAccessToken:String, urlAccessToken:String, urlResourceOwnerDetails:String, clientId:String, clientSecret:String }}  details
   * @return {*}
   */
  register = (provider, details) => {
    const connectionProps = { ...details, providerName: provider };
    const connectionJS = OauthConnection.fromJS(connectionProps).toJS();

    return this.props.setState('oauth:' + provider, connectionJS).then(() => connectionJS);
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