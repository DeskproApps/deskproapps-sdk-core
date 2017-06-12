import { CHANNEL_INCOMING, INVOCATION_REQUESTRESPONSE, buildMap, matchEvent as match } from '../Core/Event'

export const EVENT_MESSAGE_ADDED = 'context.ticket.message_added';
export const EVENT_BEFORE_MESSAGE_ADDED = 'context.ticket.before_message_added';
export const EVENT_TICKET_REPLY = 'context.ticket.reply';

export const events = {
  EVENT_MESSAGE_ADDED,
  EVENT_BEFORE_MESSAGE_ADDED,
  EVENT_TICKET_REPLY
};

export const props = {
  EVENT_TICKET_REPLY: { channelType: CHANNEL_INCOMING, invocationType: INVOCATION_REQUESTRESPONSE }
};

export const eventMap = buildMap(events, props);

export const matchEvent = (eventName, {channelType, invocationType}) => match(eventName, {channelType, invocationType}, eventMap);
