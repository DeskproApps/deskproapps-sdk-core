import * as ContextEvents from './ContextEvents';

/**
 * @class
 */
export class Context
{
  /**
   * @param {EventDispatcher} outgoingDispatcher
   * @param {EventDispatcher} incomingDispatcher
   * @param {String} type
   * @param {String} entityId
   * @param {String} locationId
   * @param {String} tabId
   * @param {String} tabUrl
   */
  constructor({ outgoingDispatcher, incomingDispatcher, type, entityId, locationId, tabId, tabUrl }) {
    this.props = {
      outgoingDispatcher,
      incomingDispatcher,
      type,
      entityId,
      locationId,
      tabId,
      tabUrl
    };
  }

  /**
   * @public
   * @return {String}
   */
  get type() { return this.props.type.toString(); }

  /**
   * @public
   * @return {String}
   */
  get entityId() { return this.props.entityId.toString(); }

  /**
   * @public
   * @return {String}
   */
  get locationId() { return this.props.locationId.toString(); }

  /**
   * @public
   * @return {String}
   */
  get tabId() { return this.props.tabId.toString(); }

  /**
   * @public
   * @return {String}
   */
  get tabUrl() { return this.props.tabUrl.toString(); }

  /**
   * @public
   * @method
   * @async
   * @return {Promise}
   */
  isTabActive = () => this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_STATUS, this.props.tabId).then(status => status.active);

  /**
   * @public
   * @method
   * @async
   * @return {Promise}
   */
  activateTab = () => this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_ACTIVATE, this.props.tabId);

  /**
   * @public
   * @method
   * @async
   * @return {Promise}
   */
  closeTab = () => this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_CLOSE, this.props.tabId);

  /**
   * @public
   * @method
   * @async
   * @return {Promise}
   */
  getTabData = () => this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_DATA, this.props.tabId);

  /**
   * @public
   * @method
   * @async
   * @return {Promise}
   */
  getMe = () => this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_ME_GET);
}