import WidgetMessage from './WidgetMessage'

/**
 * Representation of a request message
 *
 * @class
 * @extends {WidgetMessage}
 */
class WidgetRequest extends WidgetMessage
{
  /**
   * Parse an object literal or a JSON encoded string into a {@link WidgetResponse}
   * @method
   *
   * @param {{}|string} raw
   * @return {WidgetRequest}
   */
  static parse(raw)
  {
    const { id, widgetId, correlationId, body } = raw;
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
    return new WidgetRequest({ id, widgetId, correlationId: correlationId.toString(), body: parsedBody });
  };

  /**
   * @param {String} id the message id
   * @param {String} widgetId the widget it
   * @param {String} correlationId the conversation id
   * @param {*} body the message body
   */
  constructor({ id, widgetId, correlationId, body })
  {
    super ({ id, widgetId, correlationId, body });
  }
}

export default WidgetRequest