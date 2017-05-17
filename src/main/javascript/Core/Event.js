import * as MessageBroker from './MessageBroker';

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

export const createRequestEventListener = (eventName, createRequestHandler, createResponseHandler) => {
  return MessageBroker.createEventListener(eventName, createRequestHandler(eventName), createResponseHandler(eventName));
};