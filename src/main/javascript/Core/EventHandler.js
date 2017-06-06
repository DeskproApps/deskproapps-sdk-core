import { MessageBus, IncomingEventDispatcher, OutgoingEventDispatcher } from './EventDispatcher';
import { windowProxy } from './Window';
import { WidgetRequest, WidgetResponse, parseIncomingMessage, createOutgoingResponseMessage, createOutgoingRequestMessage } from './Message';
import { on as postRobotOn } from '../../../post-robot';
import { INVOCATION_REQUESTRESPONSE, INVOCATION_FIREANDFORGET } from './Event'

// incoming events

const registerIncomingEventHandler = (eventName, eventProps, eventHandler) => {
  const { onDpMessage: postRobotSend } = windowProxy.xchild.props;

  MessageBus.on(eventName, eventHandler);

  postRobotOn(eventName, event => {
    const message = parseIncomingMessage(event.data);

    if (message instanceof WidgetRequest && eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
      MessageBus.once(message.id, response => postRobotSend(eventName, response));
      MessageBus.emit(eventName, message);
    }

    if (message instanceof WidgetRequest && eventProps.invocationType === INVOCATION_FIREANDFORGET) {
      MessageBus.emit(eventName, message);
    }

    if (message instanceof WidgetResponse && eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
      MessageBus.emit(message.id, message);
    }

  });
};

export const handleIncomingEvent = (eventName, eventProps) =>
{
  let eventHandler;

  if (eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
    eventHandler = (eventName, eventProps, request) =>
    {
      const cb = (error, data) =>
      {
        const responsePayload = error ? error: data;
        const createErrorResponse = !!error;
        const response = createOutgoingResponseMessage(request, responsePayload, createErrorResponse);

        MessageBus.emit(request.id, response);
      };

      IncomingEventDispatcher.emit(eventName, cb, request.body);
    }
  } else if (eventProps.invocationType === INVOCATION_FIREANDFORGET) {
    eventHandler = (eventName, eventProps, request) => IncomingEventDispatcher.emit(eventName, request.body);
  }

  if (eventHandler) {
    registerIncomingEventHandler(eventName, eventProps, eventHandler);
  }

};

// outgoing events

const registerOutgoingEventHandler = (eventName, eventProps, eventHandler) => {

  OutgoingEventDispatcher.on(eventName, eventHandler);

  postRobotOn(eventName, event => {
    const message = parseIncomingMessage(event.data);

    // is this the response for the right event ?
    if (message instanceof WidgetResponse && eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
      MessageBus.emit(message.id, message);
    }
  });
};

export const handleOutgoingEvent = (eventName, eventProps) =>
{
  let eventHandler;

  if (eventProps.invocationType === INVOCATION_REQUESTRESPONSE) {
    eventHandler = (resolve, reject, data) => {
      // here we are sure windowProxy.xchild has been initialized, but this knowledge only makes this function brittle
      const { widgetId, onDpMessage: postRobotSend } = windowProxy.xchild.props;
      const request = createOutgoingRequestMessage(widgetId, data);

      // register a response listener
      MessageBus.once(request.id, response => (response.status == 'success' ? resolve(response.body) : reject(response.body)) );
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
