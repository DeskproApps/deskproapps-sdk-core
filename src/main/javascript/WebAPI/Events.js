import { CHANNEL_INTERNAL, CHANNEL_INCOMING, CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE } from '../Core/Event'

export const EVENT_WEBAPI_REQUEST_DESKPRO = 'webapi.request.deskpro';

const events = {
  EVENT_WEBAPI_REQUEST_DESKPRO: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE }
};
export const props = events;

export const eventNames = Object.keys(events).map(key => events[key]);

export const isEventName = name => eventNames.indexOf(name) !== -1;