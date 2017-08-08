/**
 * @module Core/Message
 */

let nextMessageId = 0;
let nextCorrelationId = 0;

/**
 * @method
 *
 * @param {String} widgetId
 * @param payload
 * @return {WidgetRequest}
 */
export const createOutgoingRequestMessage = (widgetId, payload) =>
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
export const createOutgoingResponseMessage = (request, body, isError) =>
{
  const id = ++nextMessageId;
  const { widgetId, correlationId } = request;
  const status = isError ? 'error' : 'success';

  //const parsedBody = body === null ? body : JSON.stringify(body);
  return new WidgetResponse({ id: id.toString(), widgetId, correlationId: correlationId.toString(), body, status });
};

/**
 * @method
 *
 * @param raw
 * @return {*}
 */
export const parseIncomingMessage = raw => {
  const { status } = raw;

  if (status) {
    return parseIncomingResponseMessage(raw);
  }

  return parseIncomingRequestMessage(raw);
};

/**
 * @method
 *
 * @param {*} raw
 * @return {WidgetRequest}
 */
export const parseIncomingRequestMessage = raw =>
{
  const { id, widgetId, correlationId, body } = raw;

  const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
  return new WidgetRequest({ id, widgetId, correlationId: correlationId.toString(), body: parsedBody });
};

/**
 * @method
 *
 * @param {*} raw
 * @return {WidgetResponse}
 */
export const parseIncomingResponseMessage = raw =>
{
  const { id, widgetId, correlationId, body, status } = raw;
  // still receiving json encoded strings as body from success responses
  const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
  return new WidgetResponse({ id, widgetId, correlationId: correlationId.toString(), body: parsedBody, status });
};

/**
 * @class
 */
export class WidgetResponse
{
  /**
   * @param {String} id
   * @param {String} widgetId
   * @param {String} correlationId
   * @param {*} body
   * @param {String} status
   */
  constructor({ id, widgetId, correlationId, body, status })
  {
    this.props = { id, widgetId, correlationId, body, status };
  }

  /**
   * @readonly
   *
   * @type {String}
   */
  get id() { return this.props.id };

  /**
   * @readonly
   *
   * @type {String}
   */
  get widgetId() { return this.props.widgetId };

  /**
   * @readonly
   *
   * @type {String}
   */
  get correlationId() { return this.props.correlationId };

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

  /**
   * @method
   *
   * @return {Object}
   */
  toJS = () => ({ ...this.props })
}

/**
 * @class
 */
export class WidgetRequest
{
  /**
   * @param {String} id
   * @param {String} widgetId
   * @param {String} correlationId
   * @param {*} body
   */
  constructor({ id, widgetId, correlationId, body })
  {
    this.props = { id, widgetId, correlationId, body };
  }

  /**
   * @readonly
   *
   * @type {String}
   */
  get id() { return this.props.id };

  /**
   * @readonly
   *
   * @type {String}
   */
  get widgetId() { return this.props.widgetId };

  /**
   * @readonly
   *
   * @type {String}
   */
  get correlationId() { return this.props.correlationId };

  /**
   * @readonly
   *
   * @type {*}
   */
  get body() { return this.props.body };

  /**
   * @method
   *
   * @return {Object}
   */
  toJS = () => ({ ...this.props })
}
