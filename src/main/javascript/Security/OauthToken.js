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
    const { oauthVersion } = response;
    const { token } = response.body;

    const props = { oauthVersion, ...token };
    return new OauthToken(props);
  }

  /**
   * @param oauthVersion
   * @param {{}} otherProps
   */
  constructor({ oauthVersion, ...otherProps })
  {
    super({ oauthVersion, ...otherProps })
  }

  /**
   * @readonly
   * @type {string}
   */
  get oauthVersion() { return this.props.oauthVersion; }
}