import * as Events from './Events';

/**
 * @param {EventDispatcher} eventDispatcher
 * @return {DeskproWindowFacade}
 */
export const create = eventDispatcher => { return new DeskproWindowFacade(eventDispatcher); };

export class DeskproWindowFacade
{
  constructor(eventDispatcher) {
    this.props = { eventDispatcher };
  }

  showNotification = notification => this.props.eventDispatcher.emitAsync(Events.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION, notification);

  insertMarkup = markupString => this.props.eventDispatcher.emitAsync(Events.EVENT_DESKPROWINDOW_INSERT_MARKUP, markupString);

}