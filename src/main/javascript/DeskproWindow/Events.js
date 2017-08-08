/**
 * @module DeskproWindow/Events
 */

import { CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, buildMap, matchEvent as match } from '../Core/Event'

/**
 * @readonly
 * @type {string}
 */
export const EVENT_DESKPROWINDOW_SHOW_NOTIFICATION = 'deskpro_window.show_notification';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_DESKPROWINDOW_INSERT_MARKUP = 'deskpro_window.insert_markup';

/**
 * @readonly
 * @enum
 *
 * @type {{EVENT_DESKPROWINDOW_INSERT_MARKUP: string, EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: string}}
 */
export const events = {
  EVENT_DESKPROWINDOW_INSERT_MARKUP,
  EVENT_DESKPROWINDOW_SHOW_NOTIFICATION
};

/**
 * @readonly
 * @enum
 *
 * @type {{EVENT_DESKPROWINDOW_INSERT_MARKUP: {channelType: string, invocationType: string}, EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: {channelType: string, invocationType: string}}}
 */
export const props = {
  EVENT_DESKPROWINDOW_INSERT_MARKUP: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_FIREANDFORGET },
  EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_FIREANDFORGET }
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