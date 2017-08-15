/**
 * @module Core/ContextEvents
 */

import { CHANNEL_INTERNAL, CHANNEL_INCOMING, CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE } from '../Core/Event'

/**
 * @readonly
 * @type {string}
 */
export const EVENT_WINDOW_MOUSEEVENT = 'window.mouseevent';

/**
 * @todo Should be named 'window.window-resize' when this event will be handled by the container
 * @readonly
 * @type {string}
 */
export const EVENT_WINDOW_RESIZE = 'app.reset_size';

const events = {

  EVENT_WINDOW_MOUSEEVENT : { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_FIREANDFORGET },

  EVENT_WINDOW_RESIZE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_FIREANDFORGET }

};

/**
 * @enum
 * @readonly
 * @type {{EVENT_WINDOW_MOUSEEVENT: {channelType: string, invocationType: string}, EVENT_WINDOW_RESIZE: {channelType: string, invocationType: string}}}
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