/**
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
export const EVENT_ICON_CHANGED = 'app.icon_changed';

/**
 * @type {string}
 */
export const EVENT_RESET_SIZE = 'app.reset_size';

/**
 * @type {string}
 */
export const EVENT_SUBSCRIBE = 'app.subscribe_to_event';

const events = {
  EVENT_MOUNT,

  EVENT_REFRESH,
  EVENT_UNLOAD,

  EVENT_RESET_SIZE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },
  EVENT_SUBSCRIBE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_FIREANDFORGET },
};
/**
 * @enum
 * @readonly
 * @type {{EVENT_MOUNT: string, EVENT_REFRESH: string, EVENT_UNLOAD: string, EVENT_RESET_SIZE: {channelType: string, invocationType: string}, EVENT_SUBSCRIBE: {channelType: string, invocationType: string}}}
 */
export const props = events;

/**
 * @type {Array<string>}
 */
export const eventNames = Object.keys(events).map(key => events[key]);

/**
 * @param {string} name
 * @return boolean
 */
export const isEventName = name => eventNames.indexOf(name) !== -1;