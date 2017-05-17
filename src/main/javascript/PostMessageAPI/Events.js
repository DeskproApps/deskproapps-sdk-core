export const EVENT_USER_GET = 'get-user';

export const eventNames = [ EVENT_USER_GET ];

export const isEventName = name => eventNames.indexOf(name) !== -1;
