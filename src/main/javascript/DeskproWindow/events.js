/**
 * Defines events and related functionality which enable interaction with the helpdesk Window and DOM
 *
 * The events defined in this module give the application the following capabilities:
 *
 *  - insert arbitrary DOM nodes into the helpdesk window
 *  - query the DOM of the helpdesk window
 *  - show a notification in the helpdesk window
 *
 * @module DeskproWindow/events
 */

import { CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE, buildMap, matchEvent as match } from '../Core/Event'

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
 * The map of events
 *
 * @type {EventMap}
 */
export const eventMap = buildMap(events, props);

/**
 * Checks if an event is a DeskproWindow event
 *
 * @function
 *
 * @param {string} eventName
 * @param {string} channelType
 * @param {string} invocationType
 * @return {boolean}
 */
export const matchEvent = (eventName, {channelType, invocationType}) => match(eventName, {channelType, invocationType}, eventMap);

