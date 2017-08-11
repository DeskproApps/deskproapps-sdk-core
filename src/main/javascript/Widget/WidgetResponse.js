import { WidgetMessage } from './WidgetMessage'

export class WidgetResponse extends WidgetMessage
{
  static parse(raw)
  {
    const { id, widgetId, correlationId, body, status } = raw;
    // still receiving json encoded strings as body from success responses
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
    return new WidgetResponse({ id, widgetId, correlationId: correlationId.toString(), body: parsedBody, status });
  };

  /**
   * @param {String} id
   * @param {String} widgetId
   * @param {String} correlationId
   * @param {*} body
   * @param {String} status
   */
  constructor({ id, widgetId, correlationId, body, status })
  {
    super({ id, widgetId, correlationId, body, status });
  }

  /**
   * @readonly
   *
   * @type {String}
   */
  get status() { return this.props.status };

  /**
   * @readonly
   *
   * @type {*}
   */
  get rawBody() { return this.props.body };

  /**
   * @readonly
   *
   * @type {*}
   */
  get body() { return this.props.body };
}