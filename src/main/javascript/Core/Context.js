import * as ContextEvents from './ContextEvents';

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
   * @return {String}
   */
  get type() { return this.props.type.toString(); }

  /**
   * @return {String}
   */
  get entityId() { return this.props.entityId.toString(); }

  /**
   * @return {String}
   */
  get locationId() { return this.props.locationId.toString(); }

  /**
   * @return {String}
   */
  get tabId() { return this.props.tabId.toString(); }

  /**
   * @return {String}
   */
  get tabUrl() { return this.props.tabUrl.toString(); }

  /**
   * @async
   */
  isTabActive = () => this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_STATUS, this.props.tabId).then(status => status.active);

  /**
   * @async
   */
  activateTab = () => this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_ACTIVATE, this.props.tabId);

  /**
   * @async
   */
  closeTab = () => this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_CLOSE, this.props.tabId);

  /**
   * @async
   */
  getTabData = () => this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_DATA, this.props.tabId);

  /**
   * @async
   */
  getMe = () => this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_ME_GET);
}