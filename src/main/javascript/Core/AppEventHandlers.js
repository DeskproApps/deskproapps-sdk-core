import { on as postRobotOn } from '../../../post-robot';

import * as Events from './AppEvents';
import { createRequestEventListener } from './Event';

const defaultRequestHandler = (resolve, reject, request) => resolve(request);

/**
 * @param {function} resolve
 * @param {function} reject
 * @param {WidgetMessage} message
 */
const defaultResponseHandler = (resolve, reject, message) => {
  const { status, body } = message;
  status == 'success' ? resolve(body) : reject(body);
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
  const eventName = Events.EVENT_RESET_SIZE;
  const eventListener = createRequestEventListener(eventName, createRequestHandler, createResponseHandler)

  const listeners = new Map();
  listeners.set(eventName, eventListener);
  return listeners;
};