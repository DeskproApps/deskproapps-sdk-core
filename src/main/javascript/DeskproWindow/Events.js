import { CHANNEL_OUTGOING, INVOCATION_FIREANDFORGET, buildMap, matchEvent as match } from '../Core/Event'

export const EVENT_DESKPROWINDOW_SHOW_NOTIFICATION = 'deskpro_window.show_notification';
export const EVENT_DESKPROWINDOW_INSERT_MARKUP = 'deskpro_window.insert_markup';

export const events = {
  EVENT_DESKPROWINDOW_INSERT_MARKUP,
  EVENT_DESKPROWINDOW_SHOW_NOTIFICATION
};

export const props = {
  EVENT_DESKPROWINDOW_INSERT_MARKUP: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_FIREANDFORGET },
  EVENT_DESKPROWINDOW_SHOW_NOTIFICATION: { channelType: CHANNEL_OUTGOING, invocationType: INVOCATION_FIREANDFORGET }
};

export const eventMap = buildMap(events, props);

export const matchEvent = (eventName, {channelType, invocationType}) => match(eventName, {channelType, invocationType}, eventMap);