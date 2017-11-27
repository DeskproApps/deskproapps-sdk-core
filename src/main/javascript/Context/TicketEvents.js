/**
 * @module Context/TicketEvents
 */

import { buildMap, matchEvent as match } from '../Core/Event'

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
  EVENT_BEFORE_MESSAGE_ADDED
};


/**
 * @constant
 * @type {EventMap}
 */
export const eventMap = buildMap(events, {});

/**
 * @method
 *
 * @param {String} eventName
 * @param {Object} propsPattern
 * @return {boolean}
 */
export const matchEvent = (eventName, propsPattern) => match(eventName, propsPattern, eventMap);
