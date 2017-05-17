export const EVENT_STATE_FIND = 'state.find';

export const EVENT_STATE_GET = 'state.get';

export const EVENT_STATE_SET = 'state.set';

export const EVENT_STATE_DELETE = 'state.delete';

export const eventNames = [

  EVENT_STATE_DELETE,

  EVENT_STATE_FIND,

  EVENT_STATE_GET,

  EVENT_STATE_SET
];

export const isEventName = name => eventNames.indexOf(name) !== -1;