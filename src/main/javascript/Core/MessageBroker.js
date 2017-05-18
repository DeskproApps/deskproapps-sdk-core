import { ResponseEventDispatcher } from './EventDispatcher';
import { MessageFactory } from './MessageFactory';
import { windowProxy } from './Window';
import { WidgetMessage } from './WidgetMessage';

const handleRequest = (requestHandler, initialRequest) => new Promise((resolveStart, rejectStart) => requestHandler(resolveStart, rejectStart, initialRequest));
const createResponseListener = (responseHandler, resolve, reject) => response => responseHandler(resolve, reject, new WidgetMessage(response));
const createRequestMessage = (eventName, request) => MessageFactory.createRequest(windowProxy.xchild, request);

const sendRequest = (eventName, message) => {
  const { props } = windowProxy.xchild;
  props.onDpMessage(eventName, message);
};

const registerResponseListener = (eventName, message, responseListener) => ResponseEventDispatcher.once(eventName, responseListener);

export const createEventListener = (eventName, requestHandler, responseHandler) => {
  return function (resolve, reject, initialRequest) {
      const responseListener = createResponseListener(responseHandler, resolve, reject);

      handleRequest(requestHandler, initialRequest)
        .then(request => createRequestMessage(eventName, request))
        .then(message => { registerResponseListener(eventName, message, responseListener); return message; }  )
        .then(message => sendRequest(eventName, message))
        .catch(e => reject(e))
      ;
  }
};

