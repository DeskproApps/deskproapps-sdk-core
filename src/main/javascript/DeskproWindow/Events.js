/**
 * @module DeskproWindow/Events
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
 * @readonly
 * @enum
 *
 * @type {{EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: string, EVENT_DESKPROWINDOW_DOM_INSERT: string, EVENT_DESKPROWINDOW_DOM_QUERY: string}}
 */
export const events = {
  EVENT_DESKPROWINDOW_SHOW_NOTIFICATION,
  EVENT_DESKPROWINDOW_DOM_INSERT,
  EVENT_DESKPROWINDOW_DOM_QUERY
};

/**
 * @readonly
 * @enum
 * @type {{EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: {channelType: string, invocationType: string}, EVENT_DESKPROWINDOW_DOM_INSERT: {channelType: string, invocationType: string}, EVENT_DESKPROWINDOW_DOM_QUERY: {channelType: string, invocationType: string}}}
 */
export const props = {
  EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_FIREANDFORGET },
  EVENT_DESKPROWINDOW_DOM_INSERT: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },
  EVENT_DESKPROWINDOW_DOM_QUERY: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },
};

/**
 * @type {EventMap}
 */
export const eventMap = buildMap(events, props);

/**
 * @method
 *
 * @param {string} eventName
 * @param {string} channelType
 * @param {string} invocationType
 * @return {boolean}
 */
export const matchEvent = (eventName, {channelType, invocationType}) => match(eventName, {channelType, invocationType}, eventMap);