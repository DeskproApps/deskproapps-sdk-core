import WidgetMessage from './WidgetMessage'

/**
 * Representation of a response message
 *
 * @class
 * @extends {WidgetMessage}
 */
class WidgetResponse extends WidgetMessage
{
  /**
   * Parse an object literal or a JSON encoded string into a {@link WidgetResponse}
   *
   * @static
   * @method
   *
   * @param {{}|string} raw
   * @return {WidgetResponse}
   */
  static parse(raw)
  {
    const { id, widgetId, correlationId, body, status } = raw;
    // still receiving json encoded strings as body from success responses
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
    return new WidgetResponse({ id, widgetId, correlationId: correlationId.toString(), body: parsedBody, status });
  };

  /**
   * @param {String} id the message id
   * @param {String} widgetId the widget it
   * @param {String} correlationId the conversation id
   * @param {*} body the message body
   * @param {String} status the response status
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

export default WidgetResponse