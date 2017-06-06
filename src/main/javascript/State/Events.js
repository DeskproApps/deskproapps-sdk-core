import { CHANNEL_OUTGOING, INVOCATION_REQUESTRESPONSE } from '../Core/Event'

export const EVENT_STATE_FIND = 'state.find';

export const EVENT_STATE_GET = 'state.get';

export const EVENT_STATE_SET = 'state.set';

export const EVENT_STATE_DELETE = 'state.delete';

const events = {

  EVENT_STATE_DELETE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_STATE_FIND: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_STATE_GET: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_STATE_SET: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE }

};

export const props = events;

export const eventNames = Object.keys(events).map(key => events[key]);

export const isEventName = name => eventNames.indexOf(name) !== -1;