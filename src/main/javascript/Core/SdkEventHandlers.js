import * as SdkEvents from './SdkEvents';

const defaultRequestHandler = (resolve, reject, request) => resolve(request);

const defaultResponseHandler = (resolve, reject, response) => resolve(response);

export const requestHandler = eventName => {

  if (SdkEvents.isEventName(eventName)) {
    return defaultRequestHandler;
  }

  throw new Error(`unknown event name: ${eventName}`);
};

export const responseHandler = eventName => {
  if (SdkEvents.isEventName(eventName)) {
    return defaultResponseHandler;
  }

  throw new Error(`unknown event name: ${eventName}`);
};