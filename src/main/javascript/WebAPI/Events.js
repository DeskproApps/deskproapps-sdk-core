/**
 * WebAPI module.
 * @module WebAPI/Events
 */

import { CHANNEL_INTERNAL, CHANNEL_INCOMING, CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE } from '../Core/Event'

export const EVENT_WEBAPI_REQUEST_DESKPRO = 'webapi.request.deskpro';
export const EVENT_WEBAPI_REQUEST_FETCH = 'webapi.request.fetch';

const events = {
  EVENT_WEBAPI_REQUEST_DESKPRO: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },
  EVENT_WEBAPI_REQUEST_FETCH: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },
};
/**
 * @enum
 * @readonly
 *
 * @type {{EVENT_WEBAPI_REQUEST_DESKPRO: {channelType, invocationType}, EVENT_WEBAPI_REQUEST_FETCH: {channelType, invocationType}}}
 */
export const props = events;

/**
 * @readonly
 * @type {Array}
 */
export const eventNames = Object.keys(events).map(key => events[key]);

/**
 * @method
 * @param {String} name
 * @return {boolean}
 */
export const isEventName = name => eventNames.indexOf(name) !== -1;