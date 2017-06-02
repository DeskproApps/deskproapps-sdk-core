import { ResponseEventDispatcher } from './EventDispatcher';
import { MessageFactory } from './MessageFactory';
import { windowProxy } from './Window';
import { WidgetMessage } from './WidgetMessage';

const handleRequest = (requestHandler, initialRequest) => new Promise((resolveStart, rejectStart) => requestHandler(resolveStart, rejectStart, initialRequest));
const createResponseListener = (responseHandler, resolve, reject) => response => responseHandler(resolve, reject, new WidgetMessage(response));
const createRequestResponseMessage = (eventName, request) => MessageFactory.createRequestResponse(windowProxy.xchild, request);
const createFireAndForgetMessage = (eventName, request) => MessageFactory.createFireAndForget(windowProxy.xchild, request);

const sendRequest = (eventName, message) => {
  const { props } = windowProxy.xchild;
  props.onDpMessage(eventName, message);
};

const registerResponseListener = (eventName, message, responseListener) => ResponseEventDispatcher.once(eventName, responseListener);

export const createRequestResponseEventListener = (eventName, requestHandler, responseHandler) => {
  return function (resolve, reject, initialRequest) {
      const responseListener = createResponseListener(responseHandler, resolve, reject);

      handleRequest(requestHandler, initialRequest)
        .then(request => createRequestResponseMessage(eventName, request))
        .then(message => { registerResponseListener(eventName, message, responseListener); return message; }  )
        .then(message => sendRequest(eventName, message))
        .catch(e => reject(e))
      ;
  }
};

export const createFireAndForgetEventListener = (eventName, requestHandler) => {
  return function (resolve, reject, initialRequest) {

    handleRequest(requestHandler, initialRequest)
      .then(request => createFireAndForgetMessage(eventName, request))
      .then(message => sendRequest(eventName, message))
      .catch(e => reject(e))
    ;
  }
};

