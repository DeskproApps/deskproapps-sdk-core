import * as ContextEvents from './ContextEvents';

export class Context
{
  /**
   * @param {EventEmitter} eventDispatcher
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

  isTabActive = () => false;

  /**
   * @async
   */
  activateTab = () => false;

  /**
   * @async
   */
  closeTab = () => {
    const { eventDispatcher } = this.props;

    const event = new Event({ name: ContextEvents.EVENT_TAB_CLOSED });
    eventDispatcher.emit(ContextEvents.EVENT_BEFORE_TAB_CLOSED, event);

    if (event.enabled) {
      eventDispatcher.emit(ContextEvents.EVENT_TAB_CLOSED);
    }

    return event.enabled;

  };

}