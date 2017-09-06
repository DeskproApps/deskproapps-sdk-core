/**
 * Storage/Events module.
 * @module Storage/Events
 */

const events = {};

/**
 * @constant
 *
 * @type {{}}
 */
export const props = events;

/**
 * @constant
 *
 * @type {Array}
 */
export const eventNames = Object.keys(events).map(key => events[key]);

/**
 * @method
 *
 * @param {String} name
 * @return {boolean}
 */
export const isEventName = name => eventNames.indexOf(name) !== -1;