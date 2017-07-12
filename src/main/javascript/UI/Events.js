export const EVENT_SETTINGS_VISIBILITYCHANGED = 'ui.show-settings';

export const EVENT_UI_STATECHANGED = 'ui.state-transition';

export const EVENT_UI_BEFOREVISIBILITYCHANGED = 'ui.before-visibility-change';

export const EVENT_UI_VISIBILITYCHANGED = 'ui.visibility-change';

export const EVENT_UI_BEFOREDISPLAYCHANGED = 'ui.before-display-change';

export const EVENT_UI_DISPLAYCHANGED = 'ui.display-change';

export const EVENT_MENU_VISIBILITYCHANGED = 'ui.menu-change';

export const EVENT_BADGE_COUNTCHANGED = 'ui.badge_count-changed';

export const EVENT_BADGE_VISIBILITYCHANGED = 'ui.badge_visibility-changed';



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

export const eventNames = Object.keys(events).map(key => events[key]);

export const isEventName = name => eventNames.indexOf(name) !== -1;