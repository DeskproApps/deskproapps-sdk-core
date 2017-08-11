/**
 * @module DeskproWindow/TicketEventHandlers
 */

import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

/**
 * @method
 * @param {App} app
 */
export const registerEventHandlers = (app) => {
  handleOutgoingEvent(app, Events.EVENT_DESKPROWINDOW_INSERT_MARKUP, Events.props.EVENT_DESKPROWINDOW_INSERT_MARKUP);
  handleOutgoingEvent(app, Events.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION, Events.props.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION);
};