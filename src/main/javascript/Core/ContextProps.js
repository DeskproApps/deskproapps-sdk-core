/**
 * This modules manages the application properties
 * @module Core/AppProps
 */
import {PropertyBag} from './PropertyBag'

/**
 * @class
 * @extends {PropertyBag}
 */
export default class ContextProps extends PropertyBag
{
  /**
   * @param {String} type alias for contextType
   * @param {String} contextType
   * @param {String} entityId
   * @param {String} locationId
   * @param {String} tabId
   * @param {String} tabUrl
   * @param {Object} [otherProps] experimental props
   */
  constructor({ type, contextType, entityId, locationId, tabId, tabUrl, ...otherProps })
  {
    super({ contextType: contextType || type, entityId, locationId, tabId, tabUrl, ...otherProps });
  }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get contextType() { return this.props.contextType; }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get entityId() { return this.props.entityId; }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get locationId() { return this.props.locationId; }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get tabId() { return this.props.tabId; }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get tabUrl() { return this.props.tabUrl; }
}

