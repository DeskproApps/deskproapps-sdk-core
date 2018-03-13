import { PropertyBag } from '../Core'

/**
 * Representation of an OauthToken
 * @class
 */
class OauthToken extends PropertyBag
{
  /**
   * @static
   * @method
   *
   * @param {{}} js
   * @return {OauthToken}
   */
  static fromJS(js) {
    const { oauthVersion, ...otherProps } = js;
    return new OauthToken({ oauthVersion, ...otherProps })
  }

  /**
   * @static
   * @method
   *
   * @param response
   * @return {OauthToken}
   */
  static fromOauthProxyResponse(response)
  {
    const { oauthVersion } = response;
    const { token } = response.body;

    const props = { oauthVersion, ...token };
    return new OauthToken(props);
  }

  /**
   * @param {String} oauthVersion
   * @param {...*} otherProps
   */
  constructor({ oauthVersion, ...otherProps })
  {
    super({ oauthVersion, ...otherProps })
  }

  /**
   * The oauth version for which this token was issued
   *
   * @readonly
   * @type {string}
   */
  get oauthVersion() { return this.props.oauthVersion; }
}

export default OauthToken;

