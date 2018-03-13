/**
 * Storage/Events module.
 * @module Storage/events
 */

/**
 * @type {string}
 */
export const EVENT_APP_CHANGED = 'storage.app.changed';

/**
 * @type {string}
 */
export const EVENT_ENTITY_CHANGED = 'storage.entity.changed';

/**
 * @type {string}
 */
export const EVENT_APP_FETCHED = 'storage.app.fetched';

/**
 * @type {string}
 */
export const EVENT_ENTITY_FETCHED = 'storage.entity.fetched';

/**
 * @readonly
 * @enum {string}
 * @type {{EVENT_APP_CHANGED: string, EVENT_ENTITY_CHANGED: string, EVENT_APP_FETCHED: string, EVENT_ENTITY_FETCHED: string}}
 */
const events = {
  EVENT_APP_CHANGED,
  EVENT_ENTITY_CHANGED,
  EVENT_APP_FETCHED,
  EVENT_ENTITY_FETCHED
};

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