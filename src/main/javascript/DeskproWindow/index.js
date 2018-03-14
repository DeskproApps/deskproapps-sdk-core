/**
 * This module exports the interface of the DeskproWindow package
 *
 * @module DeskproWindow
 */

import { handleOutgoingEvent } from '../Core/EventHandler';
import * as DeskproWindowEvents from './events';
import DeskproWindowFacade from './DeskproWindowFacade'

/**
 * @function
 * @param {AppEventEmitter} eventDispatcher
 * @returns {DeskproWindowFacade}
 */
export function createDeskproWindowFacade(eventDispatcher) {
  "use strict";
  return new DeskproWindowFacade(eventDispatcher);
}

/**
 * Registers helpdesk window events with the event dispatching system
 *
 * @function
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 */
export function registerEventHandlers(windowBridge, app) {
  handleOutgoingEvent(windowBridge, app, DeskproWindowEvents.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION, DeskproWindowEvents.props.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION);
  handleOutgoingEvent(windowBridge, app, DeskproWindowEvents.EVENT_DESKPROWINDOW_DOM_INSERT, DeskproWindowEvents.props.EVENT_DESKPROWINDOW_DOM_INSERT);
  handleOutgoingEvent(windowBridge, app, DeskproWindowEvents.EVENT_DESKPROWINDOW_DOM_QUERY, DeskproWindowEvents.props.EVENT_DESKPROWINDOW_DOM_QUERY);
}

export {
  /**
   * @type {module:DeskproWindow/events}
   */
  DeskproWindowEvents,

  /**
   * @type {DeskproWindowFacade}
   */
  DeskproWindowFacade
};
