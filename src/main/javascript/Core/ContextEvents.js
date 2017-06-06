import { CHANNEL_INTERNAL, CHANNEL_INCOMING, CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE } from './Event'

export const EVENT_ME_GET = 'context.me_get';

export const EVENT_TAB_STATUS = 'context.tab_status';
export const EVENT_TAB_DATA = 'context.tab_data';

export const EVENT_TAB_ACTIVATE = 'context.tab_activate';
export const EVENT_BEFORE_TAB_DEACTIVATED = 'context.before_tab_deactivated';

export const EVENT_TAB_CLOSE = 'context.tab_close';
export const EVENT_BEFORE_TAB_CLOSED = 'context.before_tab_closed';

const events = {

  EVENT_ME_GET : { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_TAB_DATA: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_TAB_ACTIVATE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE },

  EVENT_TAB_CLOSE: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_REQUESTRESPONSE }
};

export const props = events;

export const eventNames = Object.keys(events).map(key => events[key]);

export const isEventName = name => eventNames.indexOf(name) !== -1;