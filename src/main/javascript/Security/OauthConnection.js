import { PropertyBag } from '../Core';

/**
 * Representation of an Oauth connection
 *
 * @class
 */
class OauthConnection extends PropertyBag
{
  /**
   * @static
   * @method
   *
   * @param {{}} js
   * @return {OauthConnection}
   */
  static fromJS(js) {
    const { providerName, urlAuthorize, urlAccessToken, urlResourceOwnerDetails, urlRedirect, clientId, clientSecret, ...otherProps } = js;
    return new OauthConnection({ providerName, urlAuthorize, urlAccessToken, urlResourceOwnerDetails, urlRedirect, clientId, clientSecret, ...otherProps });
  }

  /**
   * @param {String} providerName the provider name
   * @param {String} urlAuthorize the url of the authorize endpoint
   * @param {String} urlAccessToken the url of the token endpoint
   * @param {String} [urlResourceOwnerDetails] the url of an endpoint that can be used after a token is obtained to retrieve information about the user
   * @param {String} urlRedirect the url the oauth provider will redirect the browser after the user grants access
   * @param {String} clientId the id of the client registered with the oauth provider
   * @param {String} [clientSecret] an optional client secret
   * @param {...*} [otherProps]
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
   * @type {String}
   */
  get urlAuthorize() { return this.props.urlAuthorize; }

  /**
   * @readonly
   * @type {String}
   */
  get urlAccessToken() { return this.props.urlAccessToken; }

  /**
   * @readonly
   * @type {null|String}
   */
  get urlResourceOwnerDetails() { return this.props.urlResourceOwnerDetails; }

  /**
   * @readonly
   * @type {null|String}
   */
  get urlRedirect() { return this.props.urlRedirect; }

  /**
   * @readonly
   * @type {String}
   */
  get clientId() { return this.props.clientId; }

  /**
   * @readonly
   * @type {null|String}
   */
  get clientSecret() { return this.props.clientSecret; }
}

export default OauthConnection