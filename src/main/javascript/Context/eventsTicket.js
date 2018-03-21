/**
 * @module Context/eventsTicket
 */

import { buildMap, matchEvent as match, CHANNEL_INCOMING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE } from '../Core/Event'

/**
 * @type {string}
 */
export const EVENT_TICKET_REPLY = 'context.ticket.reply';

/**
 * @type {string}
 */
export const EVENT_TICKET_REPLY_SUCCESS = 'context.ticket.reply-success';

/**
 * @type {string}
 */
export const EVENT_TICKET_UPDATE_SUCCESS = 'context.ticket.update-success';

/**
 * @type {{EVENT_TICKET_REPLY: {channelType: string, invocationType: string}, EVENT_TICKET_REPLY_SUCCESS: {channelType: string, invocationType: string}, EVENT_TICKET_UPDATE_SUCCESS: {channelType: string, invocationType: string}}}
 */
const events = {
  EVENT_TICKET_REPLY : { channelType: CHANNEL_INCOMING, invocationType: INVOCATION_REQUESTRESPONSE },
  EVENT_TICKET_REPLY_SUCCESS: { channelType: CHANNEL_INCOMING, invocationType: INVOCATION_FIREANDFORGET },
  EVENT_TICKET_UPDATE_SUCCESS: { channelType: CHANNEL_INCOMING, invocationType: INVOCATION_FIREANDFORGET }
};

/**
 * @readonly
 * @enum
 * @type {{EVENT_TICKET_REPLY: {channelType: string, invocationType: string}, EVENT_TICKET_REPLY_SUCCESS: {channelType: string, invocationType: string}, EVENT_TICKET_UPDATE_SUCCESS: {channelType: string, invocationType: string}}}
 */
export const props = events;

/**
 * The map of events
 *
 * @type {EventMap}
 */
export const eventMap = buildMap(events, props);

/**
 * Checks if an event is a Ticket event
 *
 * @function
 *
 * @param {string} eventName
 * @param {string} channelType
 * @param {string} invocationType
 * @return {boolean}
 */
export const matchEvent = (eventName, {channelType, invocationType}) => match(eventName, {channelType, invocationType}, eventMap);

