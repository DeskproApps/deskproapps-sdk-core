import { EventMap } from './EventMap';

export const CHANNEL_INTERNAL = 'event.channel_internal';
export const CHANNEL_INCOMING = 'event.channel_incoming';
export const CHANNEL_OUTGOING = 'event.channel_outgoing';
export const channels = {
  CHANNEL_INCOMING,
  CHANNEL_INTERNAL,
  CHANNEL_OUTGOING
};

export const INVOCATION_FIREANDFORGET = 'event.invocation_fireandforget';
export const INVOCATION_REQUESTRESPONSE = 'event.invocation_requestresponse';

export const invocations = {
  INVOCATION_FIREANDFORGET,
  INVOCATION_REQUESTRESPONSE
};

/**
 * Builds an event map from an object literal description where keys are event keys and values are event names
 *
 * @param {Object} events
 * @param {Object} eventProps
 * @return {EventMap}
 */
export const buildMap = (events, eventProps) =>
{
  const names = Object.keys(events).map(key => events[key]);

  const map = {};
  Object.keys(events).forEach(key => {
    const value = events[key];
    map[key] = value;
    map[value] = key;
  });

  return new EventMap({ map, names, props: eventProps });
};

/**
 * @param {String} eventName
 * @param {Object} propsPattern
 * @param {EventMap} eventMap
 */
export const matchEvent = (eventName, propsPattern, eventMap) => {
  if (! eventMap.isEventName(eventName)) {
    return false;
  }

  if (!propsPattern) {
    return true;
  }

  const actualProps = eventMap.getEventProps(eventName);
  return matchProps(actualProps, propsPattern);
};

/**
 * @param {*} actualProps
 * @param {String} channelType
 * @param {String} invocationType
 * @return {boolean}
 */
const matchProps = (actualProps, {channelType, invocationType}) =>
{
  if (!actualProps) { return !channelType && !invocationType }

  if (!channelType && !invocationType ) { return false; }
  if (channelType && actualProps.channelType !== channelType) { return false; }
  if (invocationType && actualProps.invocationType !== invocationType) { return false; }

  return true;
};

export default class Event
{

  constructor({ name }) {
    this.props = { name, enabled: true }
  }

  set enabled(flag) {
    this.props.enabled = flag;
  }

  get enabled() {
    return this.props.enabled;
  }
}