/**
 * Defines events and event related functionality which are closely related to an application's context
 *
 * @module Core/ContextEvents
 */

import { CHANNEL_INTERNAL, CHANNEL_INCOMING, CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE } from './Event'
import { handleOutgoingEvent } from './EventHandler';

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
 * This is not used at the moment
 *
 * @ignore
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
 * This is not used at the moment
 *
 * @ignore
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

/**
 * @method
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
export const registerEventHandlers = (windowBridge, app) => {
  handleOutgoingEvent(windowBridge, app, EVENT_ME_GET, events.EVENT_ME_GET);
  handleOutgoingEvent(windowBridge, app, EVENT_TAB_DATA, events.EVENT_TAB_DATA);
  handleOutgoingEvent(windowBridge, app, EVENT_TAB_ACTIVATE, events.EVENT_TAB_ACTIVATE);
  handleOutgoingEvent(windowBridge, app, EVENT_TAB_CLOSE, events.EVENT_TAB_CLOSE);
};