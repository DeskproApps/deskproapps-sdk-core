import { on as postRobotOn } from '../../../post-robot';

import * as Events from './Events';
import { createRequestResponseEventListener } from '../Core/Event';

const defaultRequestHandler = (resolve, reject, request) => resolve(request);

/**
 * @param {function} resolve
 * @param {function} reject
 * @param {WidgetMessage} message
 */
const defaultResponseHandler = (resolve, reject, message) => {
  const { status, body:state, id } = message;
  status == 'success' ? resolve(state ? JSON.parse(state.value) : state) : reject(state);
};

export const createRequestHandler = eventName =>
{
  if (Events.isEventName(eventName)) {
    return defaultRequestHandler;
  }

  throw new Error(`unknown event name: ${eventName}`);
};

export const createResponseHandler = eventName =>
{
  if (Events.isEventName(eventName)) {
    return defaultResponseHandler;
  }

  throw new Error(`unknown event name: ${eventName}`);
};

/**
 * @param {EventDispatcher} requestEventDispatcher
 * @param {EventDispatcher} responseEventDispatcher
 * @return {Map<String, Function>}
 */
export const registerListeners = (requestEventDispatcher, responseEventDispatcher) => {
  const listenersMap = createRequestListeners();

  const each = (listener, eventName) => {
    // register request listener
    requestEventDispatcher.addListener(eventName, listener);

    // broadcast response messages to response listeners
    postRobotOn(eventName, event => { responseEventDispatcher.emit(eventName, event.data) });
  };

  listenersMap.forEach(each);
  return listenersMap;
};

/**
 * @param {EventDispatcher} eventDispatcher
 * @return {Map<String, Function>}
 */
export const registerRequestListeners = eventDispatcher => {
  const listenersMap = createRequestListeners();
  listenersMap.forEach((listener, eventName) => eventDispatcher.addListener(eventName, listener));

  return listenersMap;
};

/**
 * @return {Map<String, Function>}
 */
export const createRequestListeners = () => {
  const reducer = (listenersMap, eventName) => {
    const listener = createRequestResponseEventListener(eventName, createRequestHandler, createResponseHandler);
    return listenersMap.set(eventName, listener);
  };
  return Events.eventNames.reduce(reducer, new Map());
};