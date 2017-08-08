import { PropertyBag } from '../Core/PropertyBag'

/**
 * @class
 */
export class OauthToken extends PropertyBag
{
  /**
   * @static
   * @method
   *
   * @param {{}} js
   * @return {OauthToken}
   */
  static fromJS(js) { return new OauthToken(js); }

  /**
   * @static
   * @method
   *
   * @param response
   * @return {OauthToken}
   */
  static fromOauthProxyResponse(response)
  {
    const { token } = response.body;
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires,
      resource_owner_id: resourceOwnerId
    } = token;

    const props = { accessToken, refreshToken, expires, resourceOwnerId, ...token };
    return new OauthToken(props);
  }

  /**
   * @param {String} accessToken
   * @param {String} refreshToken
   * @param {String} expires
   * @param {String} resourceOwnerId
   * @param {{}} otherProps
   */
  constructor({ accessToken, refreshToken, expires, resourceOwnerId, ...otherProps })
  {
    super({ accessToken, refreshToken, expires, resourceOwnerId, ...otherProps })
  }

  /**
   * @readonly
   * @type {string}
   */
  get accessToken() { return this.props.accessToken; }

  /**
   * @readonly
   * @type {string}
   */
  get refreshToken() { return this.props.refreshToken; }

  /**
   * @readonly
   * @type {string}
   */
  get expires() { return this.props.expires; }

  /**
   * @readonly
   * @type {string}
   */
  get resourceOwnerId() { return this.props.resourceOwnerId; }
}