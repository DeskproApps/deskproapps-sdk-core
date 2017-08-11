import { WidgetRequest } from './WidgetRequest'
import { WidgetResponse } from './WidgetResponse'

let nextMessageId = 0;
let nextCorrelationId = 0;

export class WidgetFactories
{
  /**
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
    const { widgetId, correlationId } = request;
    const status = isError ? 'error' : 'success';

    //const parsedBody = body === null ? body : JSON.stringify(body);
    return new WidgetResponse({ id: id.toString(), widgetId, correlationId: correlationId.toString(), body, status });
  };
}