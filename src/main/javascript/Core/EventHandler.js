/**
 * @module Core/EventHandler
 */

import { MessageBus, IncomingEventDispatcher, OutgoingEventDispatcher } from './EventDispatcher';
import { WidgetWindow, WidgetRequest, WidgetResponse, WidgetFactories } from '../Widget';
import { INVOCATION_REQUESTRESPONSE, INVOCATION_FIREANDFORGET } from './Event'

/**
 * @param {String} eventName
 * @param {Object} eventProps
 * @param rawMessage
 */
const dispatchIncomingEvent = (eventName, eventProps, rawMessage) => {
  const message = WidgetFactories.parseMessageFromJS(rawMessage);
  if (message instanceof WidgetRequest && eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
    MessageBus.once(message.correlationId, response => {
      const payload = response instanceof WidgetResponse ? response.toJS() : response;
      WidgetWindow.emit(eventName, payload);
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
  const response = WidgetFactories.nextResponse(request, responsePayload, createErrorResponse);

  MessageBus.emit(response.correlationId, response);
};

const registerIncomingEventHandler = (eventName, eventProps, eventHandler) => {
  MessageBus.on(eventName, eventHandler);
  WidgetWindow.on(eventName, event => dispatchIncomingEvent(eventName, eventProps, event.data));
};

/**
 * @method
 *
 * @param {App} app
 * @param {String} eventName
 * @param {Object} eventProps
 */
export const handleIncomingEvent = (app, eventName, eventProps) =>
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
  WidgetWindow.on(eventName, event => dispatchIncomingEvent(eventName, eventProps, event.data));
};

/**
 * @method
 *
 * @param {App} app
 * @param {string} eventName
 * @param {object} eventProps
 */
export const handleOutgoingEvent = (app, eventName, eventProps) =>
{
  let eventHandler;

  if (eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
    eventHandler = (resolve, reject, data) => {

      // resolve the promise when response comes
      const responseExecutor = response => (response.status == 'success' ? resolve(response.body) : reject(response.body));

      WidgetWindow.event(eventName, data)
        .then(({emit, request}) => {
          MessageBus.once(request.correlationId, responseExecutor);
          emit(request);
        });
    }
  } else if (eventProps.invocationType === INVOCATION_FIREANDFORGET) {
    eventHandler = (resolve, reject, data) => {
      WidgetWindow.emit(eventName, data);
      resolve(data);
    }
  }

  if (eventHandler) {
    registerOutgoingEventHandler(eventName, eventProps, eventHandler);
  }

};
