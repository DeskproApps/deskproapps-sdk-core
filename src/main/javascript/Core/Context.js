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
  async isTabActive()
  {
    return this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_STATUS, this.props.tabId)
      .then(status => status.active)
    ;
  };

  /**
   * @public
   * @method
   * @async
   * @return {Promise}
   */
  async activateTab()
  {
    return this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_ACTIVATE, this.props.tabId);
  }

  /**
   * @public
   * @method
   * @async
   * @return {Promise}
   */
  async closeTab() {
    return this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_CLOSE, this.props.tabId);
  }

  /**
   * @public
   * @method
   * @async
   * @return {Promise}
   */
  async getTabData() { return this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_DATA, this.props.tabId); }

  /**
   * @public
   * @method
   * @async
   * @return {Promise}
   */
  async getMe() {
    console.log('omega magus');
    return this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_ME_GET);
  }
}