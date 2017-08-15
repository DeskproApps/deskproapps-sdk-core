/**
 * @module Core/EventHandler
 */

import { MessageBus, IncomingEventDispatcher, OutgoingEventDispatcher } from './EventDispatcher';
import { WidgetRequest, WidgetResponse, WidgetFactories } from '../Widget';
import { INVOCATION_REQUESTRESPONSE, INVOCATION_FIREANDFORGET } from './Event'

// TODO this should form the basic for the driver for WidgetWindowBridge

/**
 * @param {WidgetWindowBridge} windowBridge
 * @param {String} eventName
 * @param {Object} eventProps
 * @param {{ data:* }} event
 */
const dispatchIncomingEvent = (windowBridge, eventName, eventProps, event) => {
  const { data: rawMessage } = event;

  const message = WidgetFactories.parseMessageFromJS(rawMessage);
  if (message instanceof WidgetRequest && eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
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
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {String} eventName
 * @param {WidgetRequest} request
 */
const createDispatchOutgoingResponseEvent = (windowBridge, eventName, request) => (error, data) => {
  windowBridge.emitResponse(eventName, error, data, request).then(({response, emit}) => emit());
};

/**
 * @method
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 * @param {String} eventName
 * @param {Object} eventProps
 */
export const handleIncomingEvent = (windowBridge, app, eventName, eventProps) =>
{
  let eventHandler;

  if (eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
    eventHandler = request =>
    {
      const cb = createDispatchOutgoingResponseEvent(windowBridge, eventName, request);
      IncomingEventDispatcher.emit(eventName, cb, request.body);
    }
  } else if (eventProps.invocationType === INVOCATION_FIREANDFORGET) {
    eventHandler = request => IncomingEventDispatcher.emit(eventName, request.body);
  }

  if (eventHandler) {
    MessageBus.on(eventName, eventHandler);
    windowBridge.on(eventName, dispatchIncomingEvent.bind(this, windowBridge, eventName, eventProps));
  }

};

/**
 * @method
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 * @param {string} eventName
 * @param {object} eventProps
 */
export const handleOutgoingEvent = (windowBridge, app, eventName, eventProps) =>
{
  let eventHandler;

  if (eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
    eventHandler = (resolve, reject, data) => {

      windowBridge.emitRequest(eventName, data)
        .then(({request, emit}) => {
        // resolve the promise when response comes
        const responseExecutor = response => (response.status == 'success' ? resolve(response.body) : reject(response.body));
        MessageBus.once(request.correlationId, responseExecutor);
        return {request, emit};
        })
      .then(({emit}) => emit())
      ;
    }
  } else if (eventProps.invocationType === INVOCATION_FIREANDFORGET) {
    eventHandler = (resolve, reject, data) => {
      windowBridge.emitRequest(eventName, data).then(({emit}) => emit()).then(() => resolve(data))
    }
  }

  if (eventHandler) {
    OutgoingEventDispatcher.on(eventName, eventHandler);
    windowBridge.on(eventName, dispatchIncomingEvent.bind(this, windowBridge, eventName, eventProps));
  }

};
