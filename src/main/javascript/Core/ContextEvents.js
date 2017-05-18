export const EVENT_TAB_STATUS = 'context.tab_status';

export const EVENT_TAB_ACTIVATE = 'context.tab_activate';
export const EVENT_BEFORE_TAB_DEACTIVATED = 'context.before_tab_deactivated';

export const EVENT_TAB_CLOSE = 'context.tab_close';
export const EVENT_BEFORE_TAB_CLOSED = 'context.before_tab_closed';

export const eventNames = [
  EVENT_TAB_ACTIVATE,
  EVENT_BEFORE_TAB_DEACTIVATED,

  EVENT_TAB_CLOSE,
  EVENT_BEFORE_TAB_CLOSED
];

export const isEventName = name => eventNames.indexOf(name) !== -1;