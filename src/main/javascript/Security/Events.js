import { CHANNEL_OUTGOING, INVOCATION_REQUESTRESPONSE } from '../Core/Event'

export const EVENT_SECURITY_AUTHENTICATE_OAUTH = 'security.authenticate.oauth';

const events = {

  EVENT_SECURITY_AUTHENTICATE_OAUTH: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE }

};

export const props = events;

export const eventNames = Object.keys(events).map(key => events[key]);

export const isEventName = name => eventNames.indexOf(name) !== -1;