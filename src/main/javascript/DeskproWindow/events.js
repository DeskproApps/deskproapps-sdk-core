/**
 * Defines events and related functionality which enable communication with the helpdesk window
 *
 * The events defined in this module give the application the following capabililties:
 *
 *  - insert arbitrary DOM nodes into the helpdesk window
 *  - query the DOM of the helpdesk window
 *  - show a notification in the helpdesk window
 *
 * @module DeskproWindow/events
 */

import { CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE, buildMap, matchEvent as match } from '../Core/Event'
import { handleOutgoingEvent } from '../Core/EventHandler';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_DESKPROWINDOW_SHOW_NOTIFICATION = 'deskpro_window.show_notification';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_DESKPROWINDOW_DOM_INSERT = 'deskpro_window.dom_insert';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_DESKPROWINDOW_DOM_QUERY = 'deskpro_window.dom_query';

/**
 * @type {{EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: {channelType: string, invocationType: string}, EVENT_DESKPROWINDOW_DOM_INSERT: {channelType: string, invocationType: string}, EVENT_DESKPROWINDOW_DOM_QUERY: {channelType: string, invocationType: string}}}
 */
const events = {
  EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_FIREANDFORGET },
  EVENT_DESKPROWINDOW_DOM_INSERT: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },
  EVENT_DESKPROWINDOW_DOM_QUERY: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },
};

/**
 * @readonly
 * @enum
 * @type {{EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: {channelType: string, invocationType: string}, EVENT_DESKPROWINDOW_DOM_INSERT: {channelType: string, invocationType: string}, EVENT_DESKPROWINDOW_DOM_QUERY: {channelType: string, invocationType: string}}}
 */
export const props = events;

/**
 * The map of helpdesk window events
 *
 * @type {EventMap}
 */
export const eventMap = buildMap(events, props);

/**
 * @function
 *
 * @param {string} eventName
 * @param {string} channelType
 * @param {string} invocationType
 * @return {boolean}
 */
export const matchEvent = (eventName, {channelType, invocationType}) => match(eventName, {channelType, invocationType}, eventMap);

/**
 * Registers helpdesk window events with the event dispatching system
 *
 * @function
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 */
export const registerEventHandlers = (windowBridge, app) => {
  handleOutgoingEvent(windowBridge, app, EVENT_DESKPROWINDOW_SHOW_NOTIFICATION, events.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION);
  handleOutgoingEvent(windowBridge, app, EVENT_DESKPROWINDOW_DOM_INSERT, events.EVENT_DESKPROWINDOW_DOM_INSERT);
  handleOutgoingEvent(windowBridge, app, EVENT_DESKPROWINDOW_DOM_QUERY, events.EVENT_DESKPROWINDOW_DOM_QUERY);
};