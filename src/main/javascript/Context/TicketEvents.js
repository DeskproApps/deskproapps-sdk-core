export const EVENT_MESSAGE_ADDED = 'context.ticket.message_added';
export const EVENT_BEFORE_MESSAGE_ADDED = 'context.ticket.before_message_added';

export const eventNames = [
  EVENT_MESSAGE_ADDED,
  EVENT_BEFORE_MESSAGE_ADDED
];

export const isEventName = name => eventNames.indexOf(name) !== -1;