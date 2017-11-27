import * as Events from './Events';

/**
 * @param {EventDispatcher} eventDispatcher
 * @return {DeskproWindowFacade}
 */
export const create = eventDispatcher => { return new DeskproWindowFacade(eventDispatcher); };

/**
 * @class
 */
export class DeskproWindowFacade
{
  constructor(eventDispatcher) {
    this.props = { eventDispatcher };
  }

  /**
   * @method
   *
   * @param notification
   */
  async showNotification (notification) {
    return this.props.eventDispatcher.emitAsync(Events.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION, notification);
  }

  /**
   * @method
   * 
   * @param markupString
   */
  async domInsert(markupString) {
    return this.props.eventDispatcher.emitAsync(Events.EVENT_DESKPROWINDOW_DOM_INSERT, markupString);
  }

  /**
   * @method
   *
   * @param query
   */
  async domQuery(query) {
    return this.props.eventDispatcher.emitAsync(Events.EVENT_DESKPROWINDOW_DOM_QUERY, query);
  }

}