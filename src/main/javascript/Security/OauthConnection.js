import {PropertyBag} from '../Core/PropertyBag';

/**
 * @class
 */
export class OauthConnection extends PropertyBag
{
  /**
   * @static
   * @method
   *
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

  /**
   * @readonly
   * @type {*|String}
   */
  get providerName() { return this.props.providerName; }

  /**
   * @readonly
   * @type {*|String}
   */
  get urlAuthorize() { return this.props.urlAuthorize; }

  /**
   * @readonly
   * @type {*|String}
   */
  get urlAccessToken() { return this.props.urlAccessToken; }

  /**
   * @readonly
   * @type {*|String}
   */
  get urlResourceOwnerDetails() { return this.props.urlResourceOwnerDetails; }

  /**
   * @readonly
   * @type {*|String}
   */
  get urlRedirect() { return this.props.urlRedirect; }

  /**
   * @readonly
   * @type {*|String}
   */
  get clientId() { return this.props.clientId; }

  /**
   * @readonly
   * @type {*|String}
   */
  get clientSecret() { return this.props.clientSecret; }
}