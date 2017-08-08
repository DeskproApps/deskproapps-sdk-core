/**
 * @module UI/Events
 */

/**
 * @type {string}
 */
export const EVENT_SETTINGS_VISIBILITYCHANGED = 'ui.show-settings';

/**
 * @type {string}
 */
export const EVENT_UI_STATECHANGED = 'ui.state-transition';

/**
 * @type {string}
 */
export const EVENT_UI_BEFOREVISIBILITYCHANGED = 'ui.before-visibility-change';

/**
 * @type {string}
 */
export const EVENT_UI_VISIBILITYCHANGED = 'ui.visibility-change';

/**
 * @type {string}
 */
export const EVENT_UI_BEFOREDISPLAYCHANGED = 'ui.before-display-change';

/**
 * @type {string}
 */
export const EVENT_UI_DISPLAYCHANGED = 'ui.display-change';

/**
 * @type {string}
 */
export const EVENT_MENU_VISIBILITYCHANGED = 'ui.menu-change';

/**
 * @type {string}
 */
export const EVENT_BADGE_COUNTCHANGED = 'ui.badge_count-changed';

/**
 * @type {string}
 */
export const EVENT_BADGE_VISIBILITYCHANGED = 'ui.badge_visibility-changed';

/**
 * @readonly
 * @enum {string}
 * @type {{EVENT_UI_STATECHANGED: string, EVENT_UI_BEFOREDISPLAYCHANGED: string, EVENT_UI_DISPLAYCHANGED: string, EVENT_UI_BEFOREVISIBILITYCHANGED: string, EVENT_UI_VISIBILITYCHANGED: string, EVENT_SETTINGS_VISIBILITYCHANGED: string, EVENT_MENU_VISIBILITYCHANGED: string, EVENT_BADGE_COUNTCHANGED: string, EVENT_BADGE_VISIBILITYCHANGED: string}}
 */
export const events = {
  EVENT_UI_STATECHANGED,
  EVENT_UI_BEFOREDISPLAYCHANGED,
  EVENT_UI_DISPLAYCHANGED,
  EVENT_UI_BEFOREVISIBILITYCHANGED,
  EVENT_UI_VISIBILITYCHANGED,

  EVENT_SETTINGS_VISIBILITYCHANGED,
  EVENT_MENU_VISIBILITYCHANGED,

  EVENT_BADGE_COUNTCHANGED,
  EVENT_BADGE_VISIBILITYCHANGED,
};

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