/**
 * This module exports events available when the application is hosted by a UI Tab component
 *
 * @module Context/eventsTicket
 */

import { CHANNEL_INTERNAL, CHANNEL_INCOMING, CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE } from '../Core/Event'

/**
 * Fetch a property of a context object
 *
 * @readonly
 * @type {string}
 */
export const EVENT_CONTEXT_PROPERTY_GET = 'context.property.get';


const events = {
  EVENT_CONTEXT_PROPERTY_GET: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE }
};

/**
 * @enum
 * @readonly
 * @type {{EVENT_CONTEXT_PROPERTY_GET: {channelType: string, invocationType: string}}}
 */
export const props = events;

/**
 * @readonly
 * @type {Array<string>}
 */
export const eventNames = Object.keys(events).map(key => events[key]);

/**
 * @method
 *
 * @param {string} name
 * @return {boolean}
 */
export const isEventName = name => eventNames.indexOf(name) !== -1;
