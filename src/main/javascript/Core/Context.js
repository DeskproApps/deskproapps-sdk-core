import * as ContextEvents from './ContextEvents';

export class Context
{
  /**
   * @param {EventDispatcher} eventDispatcher
   * @param {String} type
   * @param {String} entityId
   * @param {String} locationId
   * @param {String} tabId
   * @param otherProps
   */
  constructor({ eventDispatcher, type, entityId, locationId, tabId, ...otherProps }) {
    this.props = {
      eventDispatcher,
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
  isTabActive = () => this.props.eventDispatcher.emitAsync(ContextEvents.EVENT_TAB_STATUS, this.props.tabId).then(status => status.active);

  /**
   * @async
   */
  activateTab = () => this.props.eventDispatcher.emitAsync(ContextEvents.EVENT_TAB_ACTIVATE, this.props.tabId);

  /**
   * @async
   */
  closeTab = () => this.props.eventDispatcher.emitAsync(ContextEvents.EVENT_TAB_CLOSE, this.props.tabId);

  /**
   * @async
   */
  getTabData = () => this.props.eventDispatcher.emitAsync(ContextEvents.EVENT_TAB_DATA, this.props.tabId);

  /**
   * @async
   */
  getMe = () => this.props.eventDispatcher.emitAsync(ContextEvents.EVENT_ME_GET);




}