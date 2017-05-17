import * as Events from './Events';
import { createRequestEventListener } from '../Core/Event';

const defaultRequestHandler = (resolve, reject, request) => resolve(request);

const defaultResponseHandler = (resolve, reject, response) => resolve(response);

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
 * @param {EventDispatcher} eventDispatcher
 * @return {Map<String, Function>}
 */
export const registerRequestListeners = eventDispatcher => {
  const listenersMap = createRequestListeners();
  listenersMap.forEach((value, key) => eventDispatcher.addListener(key, value));

  return listenersMap;
};

/**
 * @return {Map<String, Function>}
 */
export const createRequestListeners = () => {
  const reducer = (listenersMap, eventName) => {
    const listener = createRequestEventListener(eventName, createRequestHandler, createResponseHandler);
    return listenersMap.set(eventName, listener);
  };
  return Events.eventNames.reduce(reducer, new Map());
};