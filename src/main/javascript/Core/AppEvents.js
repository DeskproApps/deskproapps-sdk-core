export const EVENT_MOUNT = 'app.mount';

export const EVENT_SHOW = 'app.show';
export const EVENT_BEFORE_SHOW = 'app.before_show';

export const EVENT_HIDE = 'app.hide';
export const EVENT_BEFORE_HIDE = 'app.before_hide';

export const EVENT_COLLAPSE = 'app.collapse';
export const EVENT_BEFORE_COLLAPSE = 'app.before_collapse';

export const EVENT_BEFORE_EXPAND = 'app.before_expand';
export const EVENT_EXPAND = 'app.expand';

export const EVENT_REFRESH = 'app.refresh';
export const EVENT_UNLOAD = 'app.unload';

export const eventNames = [
  EVENT_MOUNT,

  EVENT_SHOW,
  EVENT_BEFORE_SHOW,
  EVENT_HIDE,
  EVENT_BEFORE_HIDE,

  EVENT_COLLAPSE,
  EVENT_BEFORE_COLLAPSE,

  EVENT_EXPAND,
  EVENT_BEFORE_EXPAND,

  EVENT_REFRESH,
  EVENT_UNLOAD
];

export const isEventName = name => eventNames.indexOf(name) !== -1;