/**
 * Defines events and event related functionality which are closely related to an application's context
 *
 * @module Core/ContextUserEvents
 */

import { CHANNEL_INTERNAL, CHANNEL_INCOMING, CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE } from './Event'
import { handleOutgoingEvent } from './EventHandler';

/**
 * @readonly
 * @type {string}
 */
export const EVENT_ME_GET = 'context.me_get';

const events = {

  EVENT_ME_GET : { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },
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
};