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

export const createRequestResponseEventListener = (eventName, createRequestHandler, createResponseHandler) => MessageBroker.createRequestResponseEventListener(eventName, createRequestHandler(eventName), createResponseHandler(eventName));
export const createFireAndForgetEventListener = (eventName, createRequestHandler) => MessageBroker.createFireAndForgetEventListener(eventName, createRequestHandler(eventName));