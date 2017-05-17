export const EVENT_TAB_ACTIVATED = 'context.tab_activated';
export const EVENT_TAB_DEACTIVATED = 'context.tab_deactivated';
export const EVENT_BEFORE_TAB_DEACTIVATED = 'context.before_tab_deactivated';

export const EVENT_BEFORE_TAB_CLOSED = 'context.before_tab_closed';
export const EVENT_TAB_CLOSED = 'context.tab_closed';

export const eventNames = [
  EVENT_TAB_ACTIVATED,

  EVENT_TAB_DEACTIVATED,
  EVENT_BEFORE_TAB_DEACTIVATED,

  EVENT_BEFORE_TAB_CLOSED,
  EVENT_TAB_CLOSED
];

export const isEventName = name => eventNames.indexOf(name) !== -1;