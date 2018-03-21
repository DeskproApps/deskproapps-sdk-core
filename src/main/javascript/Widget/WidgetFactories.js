import WidgetRequest from './WidgetRequest'
import WidgetResponse from './WidgetResponse'
import WidgetWindowBridge from './WidgetWindowBridge'
import InitPropertiesBag from './InitPropertiesBag'

let nextMessageId = 0;
let nextCorrelationId = 0;

/**
 * Various factory methods
 *
 * @class
 */
class WidgetFactories
{
  /**
   * Creates a communication bridge between the a widget and the `window` object if in a browser environment
   *
   * @static
   * @method
   *
   * @return {WidgetFactories.windowBridgeFromWindow}
   */
  static windowBridgeFromGlobals()
  {
    if (window) {
      return new WidgetFactories.windowBridgeFromWindow(window);
    }

    throw new Error('could not find a global window object')
  }

  /**
   * Creates a communication bridge between the a widget and the `window` object
   *
   * @static
   * @method
   *
   * @param {Window} windowObject
   * @return {WidgetWindowBridge}
   * @throws Error
   */
  static windowBridgeFromWindow(windowObject)
  {
    const initProps = InitPropertiesBag.fromWindow(windowObject);
    if (InitPropertiesBag.validate(initProps)) {
      return new WidgetWindowBridge(windowObject, initProps);
    }

    throw new Error('invalid or missing init properties');
  }

  /**
   * Parse an object literal or a JSON encoded string into a {@link WidgetResponse} or a {@link WidgetRequest}
   *
   * @static
   * @method
   *
   * @param {{}|string} raw
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
   * Creates a new request
   *
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
   * Creates the response message for a request
   *
   * @static
   * @method
   *
   * @param {WidgetRequest} request the initial request
   * @param {*} body response body
   * @param {boolean} isError true when the response is an error response
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

export default WidgetFactories