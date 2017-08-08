/**
 * @module Core/EventHandler
 */

import { MessageBus, IncomingEventDispatcher, OutgoingEventDispatcher } from './EventDispatcher';
import { windowProxy } from './Window';
import { WidgetRequest, WidgetResponse, parseIncomingMessage, createOutgoingResponseMessage, createOutgoingRequestMessage } from './Message';
import { on as postRobotOn } from '../../../post-robot';
import { INVOCATION_REQUESTRESPONSE, INVOCATION_FIREANDFORGET } from './Event'

/**
 * @param {String} eventName
 * @param {Object} eventProps
 * @param rawMessage
 */
const dispatchIncomingEvent = (eventName, eventProps, rawMessage) => {
  // this should not be here good here
  const { onDpMessage: postRobotSend } = windowProxy.xchild.props;

  const message = parseIncomingMessage(rawMessage);
  if (message instanceof WidgetRequest && eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
    MessageBus.once(message.correlationId, response => {
      const payload = response instanceof WidgetResponse ? response.toJS() : response;
      postRobotSend(eventName, payload);
    });
    MessageBus.emit(eventName, message);
  }

  if (message instanceof WidgetRequest && eventProps.invocationType === INVOCATION_FIREANDFORGET) {
    MessageBus.emit(eventName, message);
  }

  if (message instanceof WidgetResponse && eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
    MessageBus.emit(message.correlationId, message);
  }
};

/**
 * TODO: this should handle requests and response, not only requests
 * @param request
 */
const createDispatchOutgoingResponseEvent = request => (error, data) => {
  const responsePayload = error ? error: data;
  const createErrorResponse = !!error;
  const response = createOutgoingResponseMessage(request, responsePayload, createErrorResponse);

  MessageBus.emit(response.correlationId, response);
};

const registerIncomingEventHandler = (eventName, eventProps, eventHandler) => {
  MessageBus.on(eventName, eventHandler);
  postRobotOn(eventName, event => dispatchIncomingEvent(eventName, eventProps, event.data));
};

/**
 * @method
 *
 * @param {String} eventName
 * @param {Object} eventProps
 */
export const handleIncomingEvent = (eventName, eventProps) =>
{
  let eventHandler;

  if (eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
    eventHandler = request =>
    {
      const cb = createDispatchOutgoingResponseEvent(request);
      IncomingEventDispatcher.emit(eventName, cb, request.body);
    }
  } else if (eventProps.invocationType === INVOCATION_FIREANDFORGET) {
    eventHandler = request => IncomingEventDispatcher.emit(eventName, request.body);
  }

  if (eventHandler) {
    registerIncomingEventHandler(eventName, eventProps, eventHandler);
  }

};

// outgoing events

const registerOutgoingEventHandler = (eventName, eventProps, eventHandler) => {
  OutgoingEventDispatcher.on(eventName, eventHandler);
  postRobotOn(eventName, event => dispatchIncomingEvent(eventName, eventProps, event.data));
};

/**
 * @method
 *
 * @param {string} eventName
 * @param {object} eventProps
 */
export const handleOutgoingEvent = (eventName, eventProps) =>
{
  let eventHandler;

  if (eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
    eventHandler = (resolve, reject, data) => {
      // here we are sure windowProxy.xchild has been initialized, but this knowledge only makes this function brittle
      const { widgetId, onDpMessage: postRobotSend } = windowProxy.xchild.props;
      const request = createOutgoingRequestMessage(widgetId, data);

      // register a response listener
      MessageBus.once(request.correlationId, response => (response.status == 'success' ? resolve(response.body) : reject(response.body)) );
      postRobotSend(eventName, request.toJS());
    }
  } else if (eventProps.invocationType === INVOCATION_FIREANDFORGET) {
    eventHandler = (resolve, reject, data) => {
      // here we are sure windowProxy.xchild has been initialized, but this knowledge only makes this function brittle
      const { widgetId, onDpMessage: postRobotSend } = windowProxy.xchild.props;

      const request = createOutgoingRequestMessage(widgetId, data);
      postRobotSend(eventName, request.toJS());
      resolve(data);
    }
  }

  if (eventHandler) {
    registerOutgoingEventHandler(eventName, eventProps, eventHandler);
  }

};
