import { WidgetRequest } from './WidgetRequest'
import { WidgetResponse } from './WidgetResponse'
import { WidgetWindowBridge } from './WidgetWindowBridge'
import { InitProps } from './InitProps'

let nextMessageId = 0;
let nextCorrelationId = 0;

/**
 * @class
 */
export class WidgetFactories
{
  /**
   * @static
   * @method
   *
   * @return {WidgetFactories.windowBridgeFromWindow}
   */
  static windowBridgeFromGlobals()
  {
    return new WidgetFactories.windowBridgeFromWindow(window);
  }

  /**
   * @static
   * @method
   *
   * @param {Window} windowObject
   * @return {WidgetWindowBridge}
   * @throws Error
   */
  static windowBridgeFromWindow(windowObject)
  {
    const initProps = InitProps.fromWindow(windowObject);
    if (InitProps.validate(initProps)) {
      return new WidgetWindowBridge(windowObject, initProps);
    }

    throw new Error('invalid or missing init properties');
  }

  /**
   * @static
   * @method
   *
   * @param {*} raw
   * @return {WidgetMessage}
   */
  static parseMessageFromJS(raw)
  {
    const { status } = raw;

    if (status) {
      return WidgetResponse.parse(raw);
    }

    return WidgetRequest.parse(raw);
  }

  /**
   * @static
   * @method
   *
   * @param {string} widgetId
   * @param {*} payload
   * @return {WidgetRequest}
   */
  static nextRequest (widgetId, payload)
  {
    const correlationId = ++nextCorrelationId;
    const id = ++nextMessageId;

    return new WidgetRequest({ id: id.toString(), widgetId, correlationId: correlationId.toString(), body: payload });
  };

  /**
   * @static
   * @method
   *
   * @param {WidgetRequest} request
   * @param {*} body
   * @param {boolean} isError
   * @return {WidgetResponse}
   */
  static nextResponse (request, body, isError)
  {
    const id = ++nextMessageId;
    const {
      /**
       * @ignore
       *
       * @type {string}
       * */
      widgetId,
      correlationId
    } = request;
    const status = isError ? 'error' : 'success';

    //const parsedBody = body === null ? body : JSON.stringify(body);
    return new WidgetResponse({ id: id.toString(), widgetId, correlationId: correlationId.toString(), body, status });
  };
}