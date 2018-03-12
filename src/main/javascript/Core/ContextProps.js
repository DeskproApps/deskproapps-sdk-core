import PropertyBag from './PropertyBag'

/**
 * A simple property bag that exposes accessors for the most common properties related to the context in which this application runs
 *
 * @class
 * @extends {PropertyBag}
 */
class ContextProps extends PropertyBag
{
  /**
   * @param {String} type alias for contextType
   * @param {String} contextType the context type
   * @param {String} entityId the id of the Deskpro Entity referenced by this UITab
   * @param {String} locationId the id of the specific location within the UITab where the app is mounted
   * @param {String} tabId the id of this tab
   * @param {String} tabUrl the Deskpro URL of this tab
   * @param {...*} [otherProps] experimental or undocumented props
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

export default ContextProps