/**
 * @module DeskproWindow/EventHandlers
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
  handleOutgoingEvent(windowBridge, app, Events.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION, Events.props.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION);
  handleOutgoingEvent(windowBridge, app, Events.EVENT_DESKPROWINDOW_DOM_INSERT, Events.props.EVENT_DESKPROWINDOW_DOM_INSERT);
  handleOutgoingEvent(windowBridge, app, Events.EVENT_DESKPROWINDOW_DOM_QUERY, Events.props.EVENT_DESKPROWINDOW_DOM_QUERY);
};