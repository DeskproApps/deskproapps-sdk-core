/**
 * Defines events and event related functionality which are related to the application
 *
 * @module Core/AppEvents
 */

import { CHANNEL_INTERNAL, CHANNEL_INCOMING, CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE } from './Event'

/**
 * @type {string}
 */
export const EVENT_MOUNT = 'app.mount';

/**
 * @type {string}
 */
export const EVENT_REFRESH = 'app.refresh';

/**
 * @type {string}
 */
export const EVENT_UNLOAD = 'app.unload';

/**
 * @type {string}
 */
export const EVENT_TITLE_CHANGED = 'app.title_changed';

/**
 * @type {string}
 */
export const EVENT_SUBSCRIBE = 'app.subscribe_to_event';

/**
 * @type {string}
 */
export const EVENT_BADGE = 'app.badge';

const events = {
  EVENT_MOUNT,

  EVENT_REFRESH,
  EVENT_UNLOAD,
    
  EVENT_TITLE_CHANGED,
  
  EVENT_BADGE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_FIREANDFORGET },
  EVENT_RESET_SIZE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },
  EVENT_SUBSCRIBE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },
};

/**
 * @enum
 * @readonly
 * @type {{EVENT_MOUNT: string, EVENT_REFRESH: string, EVENT_UNLOAD: string, EVENT_RESET_SIZE: {channelType: string, invocationType: string}, EVENT_SUBSCRIBE: {channelType: string, invocationType: string}}}
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
 * @return boolean
 */
export const isEventName = name => eventNames.indexOf(name) !== -1;

import { handleOutgoingEvent } from './EventHandler';

/**
 * Registers
 *
 * @function
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
export const registerEventHandlers = (windowBridge, app) => {
  handleOutgoingEvent(windowBridge, app, EVENT_SUBSCRIBE, events.EVENT_SUBSCRIBE);
  handleOutgoingEvent(windowBridge, app, EVENT_BADGE, events.EVENT_BADGE);
};
