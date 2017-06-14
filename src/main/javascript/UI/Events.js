export const EVENT_SHOW_SETTINGS = 'ui.show-settings';
export const EVENT_STATE_TRANSITION = 'ui.state-transition';
export const EVENT_MENU_STATE_TRANSITION = 'ui.menu-change';
export const EVENT_BADGE_COUNTCHANGED = 'ui.badge_count-changed';
export const EVENT_BADGE_VISIBILITYCHANGED = 'ui.badge_visibility-changed';

export const events = {
  EVENT_SHOW_SETTINGS,
  EVENT_STATE_TRANSITION,
  EVENT_MENU_STATE_TRANSITION,
  EVENT_BADGE_COUNTCHANGED,
  EVENT_BADGE_VISIBILITYCHANGED,
};

export const eventNames = Object.keys(events).map(key => events[key]);

export const isEventName = name => eventNames.indexOf(name) !== -1;