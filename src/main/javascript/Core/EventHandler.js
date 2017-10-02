/**
 * @module Core/EventHandler
 */

import { MessageBus, IncomingEventDispatcher, OutgoingEventDispatcher } from './EventDispatcher';
import { WidgetRequest, WidgetResponse, WidgetFactories } from '../Widget';
import { INVOCATION_REQUESTRESPONSE, INVOCATION_FIREANDFORGET } from './Event'

// TODO this should form the basic for the driver for WidgetWindowBridge

class EventHandler
{
  /**
   * @param {WidgetWindowBridge} windowBridge
   * @param {function} resolve
   * @param {function} reject
   * @param {string} event
   * @param {*} data
   * @param {string} invocationType
   */
  static handleOutgoingEvent(windowBridge, resolve, reject, {event, invocationType, data})
  {
    if (invocationType === INVOCATION_REQUESTRESPONSE) {
      windowBridge.emitRequest(event, data)
        .then(({request, emit}) => {
          // resolve the promise when response comes
          const responseExecutor = response => (response.status == 'success' ? resolve(response.body) : reject(response.body));
          MessageBus.once(request.correlationId, responseExecutor);
          return {request, emit};
        })
        .then(({emit}) => emit())
      ;
    } else if (invocationType === INVOCATION_FIREANDFORGET) {
      windowBridge.emitRequest(event, data).then(({emit}) => emit()).then(() => resolve(data));
    }
  }

  /**
   * @param {WidgetWindowBridge} windowBridge
   * @param {string} event
   * @param {string} invocationType
   * @param {WidgetRequest} request
   */
  static handleIncomingEvent(windowBridge, {event, invocationType}, request)
  {
    if (invocationType === INVOCATION_REQUESTRESPONSE) {
      const cb = (error, data) => {
        windowBridge.emitResponse(event, error, data, request)
          .then(({response, emit}) => emit())
      };

      IncomingEventDispatcher.emit(event, cb, request.body);
    } else if (invocationType === INVOCATION_FIREANDFORGET) {
      IncomingEventDispatcher.emit(event, request.body)
    }
  }
}

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
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 */
export const handleInvokeEvents = (windowBridge, app) =>
{
  OutgoingEventDispatcher.onInvoke(EventHandler.handleOutgoingEvent.bind(null, windowBridge));
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
  const { invocationType, ...otherProps } = eventProps;

  if (-1 !== [INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE].indexOf(invocationType)) {

    const invocation = { event: eventName, invocationType, ...otherProps };
    MessageBus.on(eventName, EventHandler.handleIncomingEvent.bind(windowBridge, invocation));
    windowBridge.on(eventName, dispatchIncomingEvent.bind(this, windowBridge, eventName, eventProps));
  }
};

/**
 * @method
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 * @param {string} eventName
 * @param {{invocationType:String}} eventProps
 */
export const handleOutgoingEvent = (windowBridge, app, eventName, eventProps) =>
{
  const { invocationType, ...otherProps } = eventProps;

  if (-1 !== [INVOCATION_FIREANDFORGET, INVOCATION_REQUESTRESPONSE].indexOf(invocationType)) {
    const handler = (resolve, reject, data) => EventHandler.handleOutgoingEvent(
      windowBridge,
      resolve, reject,
      {event: eventName, data, invocationType, ...otherProps}
    );

    OutgoingEventDispatcher.on(eventName, handler);
    windowBridge.on(eventName, dispatchIncomingEvent.bind(this, windowBridge, eventName, eventProps));
  }

};
