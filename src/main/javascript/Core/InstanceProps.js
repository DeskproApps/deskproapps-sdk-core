/**
 * This modules manages the application properties
 * @module Core/AppProps
 */
import {PropertyBag} from './PropertyBag'

/**
 * @class
 * @extends {PropertyBag}
 */
export default class InstanceProps extends PropertyBag
{
  /**
   * @param {String} appId
   * @param {String} appTitle
   * @param {String} appPackageName
   * @param {String} instanceId
   * @param {{}} otherProps
   */
  constructor({ appId, appTitle, appPackageName, instanceId, ...otherProps })
  {
    super({ appId, appTitle, appPackageName, instanceId, ...otherProps })
  }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get appId() { return this.props.appId; }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get appTitle() { return this.props.appTitle; }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get appPackageName() { return this.props.appPackageName; }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get instanceId() { return this.props.instanceId; }
}