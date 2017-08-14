/**
 * @module DeskproWindow/TicketEventHandlers
 */

import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

/**
 * @method
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 */
export const registerEventHandlers = (windowBridge, app) => {
  handleOutgoingEvent(windowBridge, app, Events.EVENT_DESKPROWINDOW_INSERT_MARKUP, Events.props.EVENT_DESKPROWINDOW_INSERT_MARKUP);
  handleOutgoingEvent(windowBridge, app, Events.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION, Events.props.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION);
};