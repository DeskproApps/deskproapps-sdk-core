/**
 * @module Core/ContextEvents
 */

import { CHANNEL_INTERNAL, CHANNEL_INCOMING, CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE } from './Event'

/**
 * @readonly
 * @type {string}
 */
export const EVENT_ME_GET = 'context.me_get';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_TAB_STATUS = 'context.tab_status';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_TAB_DATA = 'context.tab_data';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_TAB_ACTIVATE = 'context.tab_activate';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_BEFORE_TAB_DEACTIVATED = 'context.before_tab_deactivated';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_TAB_CLOSE = 'context.tab_close';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_BEFORE_TAB_CLOSED = 'context.before_tab_closed';

const events = {

  EVENT_ME_GET : { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_TAB_DATA: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_TAB_ACTIVATE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_TAB_CLOSE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE }
};

/**
 * @enum
 * @readonly
 * @type {{EVENT_ME_GET: {channelType: string, invocationType: string}, EVENT_TAB_DATA: {channelType: string, invocationType: string}, EVENT_TAB_ACTIVATE: {channelType: string, invocationType: string}, EVENT_TAB_CLOSE: {channelType: string, invocationType: string}}}
 */
export const props = events;

/**
 * @type {Array<string>}
 */
export const eventNames = Object.keys(events).map(key => events[key]);

/**
 * @param {string} name
 * @return {boolean}
 */
export const isEventName = name => eventNames.indexOf(name) !== -1;