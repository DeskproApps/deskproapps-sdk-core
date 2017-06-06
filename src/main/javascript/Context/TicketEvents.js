import { CHANNEL_INCOMING, INVOCATION_REQUESTRESPONSE } from '../Core/Event'

export const EVENT_MESSAGE_ADDED = 'context.ticket.message_added';
export const EVENT_BEFORE_MESSAGE_ADDED = 'context.ticket.before_message_added';
export const EVENT_REPLY = 'context.ticket.reply';

const events = {
  EVENT_MESSAGE_ADDED,
  EVENT_BEFORE_MESSAGE_ADDED,
  EVENT_REPLY: { channelType: CHANNEL_INCOMING, invocationType: INVOCATION_REQUESTRESPONSE }
};
export const props = events;

export const eventNames = Object.keys(events).map(key => events[key]);
export const isEventName = name => eventNames.indexOf(name) !== -1;