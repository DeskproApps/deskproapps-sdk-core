import { CHANNEL_OUTGOING, INVOCATION_REQUESTRESPONSE } from '../Core/Event'


const events = {

  EVENT_STATE_DELETE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_STATE_FIND: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_STATE_GET: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_STATE_SET: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE }

};

export const props = events;

export const eventNames = Object.keys(events).map(key => events[key]);

export const isEventName = name => eventNames.indexOf(name) !== -1;