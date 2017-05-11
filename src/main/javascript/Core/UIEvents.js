export const EVENT_SHOW_SETTINGS = 'ui.show-settings';
export const EVENT_STATE_TRANSITION = 'ui.state-transition';
export const EVENT_MENU_STATE_TRANSITION = 'ui.menu-change';

export const eventNames = [
  EVENT_SHOW_SETTINGS,
  EVENT_STATE_TRANSITION,
  EVENT_MENU_STATE_TRANSITION
];

export const isEventName = name => eventNames.indexOf(name) !== -1;