export const EVENT_MESSAGE_ADDED = 'context.ticket.message_added';
export const EVENT_BEFORE_MESSAGE_ADDED = 'context.ticket.before_message_added';

export const events = {
  EVENT_MESSAGE_ADDED,
  EVENT_BEFORE_MESSAGE_ADDED
};

export const eventNames = Object.keys(events).map(key => events[key]);

export const isEventName = name => eventNames.indexOf(name) !== -1;