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
   * @param otherProps
   */
  constructor({ outgoingDispatcher, incomingDispatcher, type, entityId, locationId, tabId, ...otherProps }) {
    this.props = {
      outgoingDispatcher,
      incomingDispatcher,
      type,
      entityId,
      locationId,
      tabId,
      ...otherProps
    };
  }

  get type() { return this.props.type; }

  get entityId() { return this.props.entityId; }

  get locationId() { return this.props.locationId; }

  get tabId() { return this.props.tabId; }

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
  getTabData = () => {
    console.log('get tab data', this.props.outgoingDispatcher);
    return this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_DATA, this.props.tabId);
  };

  /**
   * @async
   */
  getMe = () => this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_ME_GET);




}