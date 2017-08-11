import { WidgetMessage  } from './WidgetMessage'

export class WidgetRequest extends WidgetMessage
{
  /**
   * @method
   *
   * @param {*} raw
   * @return {WidgetRequest}
   */
  static parse(raw)
  {
    const { id, widgetId, correlationId, body } = raw;
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
    return new WidgetRequest({ id, widgetId, correlationId: correlationId.toString(), body: parsedBody });
  };

  /**
   * @param {String} id
   * @param {String} widgetId
   * @param {String} correlationId
   * @param {*} body
   */
  constructor({ id, widgetId, correlationId, body })
  {
    super ({ id, widgetId, correlationId, body });
  }
}