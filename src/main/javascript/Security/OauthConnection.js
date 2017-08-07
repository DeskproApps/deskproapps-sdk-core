import {PropertyBag} from '../Core/PropertyBag';

export class OauthConnection extends PropertyBag
{
  /**
   * @param {{}} js
   * @return {OauthConnection}
   */
  static fromJS(js) { return new OauthConnection(js); }

  /**
   * @param {String} providerName
   * @param {String} urlAuthorize
   * @param {String} urlAccessToken
   * @param {String} urlResourceOwnerDetails
   * @param {String} urlRedirect
   * @param {String} clientId
   * @param {String} clientSecret
   * @param {{}} otherProps
   */
  constructor({ providerName, urlAuthorize, urlAccessToken, urlResourceOwnerDetails, urlRedirect, clientId, clientSecret, ...otherProps })
  {
    super({ providerName, urlAuthorize, urlAccessToken, urlResourceOwnerDetails, urlRedirect, clientId, clientSecret, ...otherProps })
  }

  get providerName() { return this.props.providerName; }

  get urlAuthorize() { return this.props.urlAuthorize; }

  get urlAccessToken() { return this.props.urlAccessToken; }

  get urlResourceOwnerDetails() { return this.props.urlResourceOwnerDetails; }

  get urlRedirect() { return this.props.urlRedirect; }

  get clientId() { return this.props.clientId; }

  get clientSecret() { return this.props.clientSecret; }
}