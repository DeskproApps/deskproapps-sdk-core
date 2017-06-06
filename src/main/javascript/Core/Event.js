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