/**
 * @module Context/TicketEvents
 */

import { CHANNEL_INCOMING, INVOCATION_REQUESTRESPONSE, buildMap, matchEvent as match } from '../Core/Event'

/**
 * @type {string}
 */
export const EVENT_MESSAGE_ADDED = 'context.ticket.message_added';

/**
 * @type {string}
 */
export const EVENT_BEFORE_MESSAGE_ADDED = 'context.ticket.before_message_added';

/**
 * @type {string}
 */
export const EVENT_TICKET_REPLY = 'context.ticket.reply';

/**
 * @enum
 * @type {{EVENT_MESSAGE_ADDED: string, EVENT_BEFORE_MESSAGE_ADDED: string, EVENT_TICKET_REPLY: string}}
 */
export const events = {
  EVENT_MESSAGE_ADDED,
  EVENT_BEFORE_MESSAGE_ADDED,
  EVENT_TICKET_REPLY
};

/**
 * @enum
 * @type {{EVENT_TICKET_REPLY: {channelType, invocationType}}}
 */
export const props = {
  EVENT_TICKET_REPLY: { channelType: CHANNEL_INCOMING, invocationType: INVOCATION_REQUESTRESPONSE }
};

/**
 * @constant
 * @type {EventMap}
 */
export const eventMap = buildMap(events, props);

/**
 * @method
 *
 * @param {String} eventName
 * @param {Object} propsPattern
 * @return {boolean}
 */
export const matchEvent = (eventName, propsPattern) => match(eventName, propsPattern, eventMap);
