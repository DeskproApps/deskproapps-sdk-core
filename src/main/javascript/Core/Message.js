let nextMessageId = 0;
let nextCorrelationId = 0;


/**
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

export const parseIncomingMessage = raw => {
  const { status } = raw;

  if (status) {
    return parseIncomingResponseMessage(raw);
  }

  return parseIncomingRequestMessage(raw);
};

/**
 * @param {*} raw
 * @return {WidgetRequest}
 */
export const parseIncomingRequestMessage = raw =>
{
  const { id, widgetId, correlationId, body } = raw;

  const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
  return new WidgetRequest({ id, widgetId, correlationId, body: parsedBody });
};

/**
 * @param {*} raw
 * @return {WidgetResponse}
 */
export const parseIncomingResponseMessage = raw =>
{
  const { id, widgetId, correlationId, body, status } = raw;
  const parsedBody = status === 'error' && typeof  body === 'string' ? JSON.parse(body) : body;
  return new WidgetResponse({ id, widgetId, correlationId, body: parsedBody, status });
};


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
   *
   * @return {String}
   */
  get id() { return this.props.id };

  /**
   * @return {String}
   */
  get widgetId() { return this.props.widgetId };

  /**
   * @return {String}
   */
  get correlationId() { return this.props.correlationId };

  /**
   * @return {String}
   */
  get status() { return this.props.status };

  /**
   * @return {*}
   */
  get rawBody() { return this.props.body };

  /**
   * @return {*}
   */
  get body() { return this.props.body };

  toJS = () => ({ ...this.props })
}

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
   *
   * @return {String}
   */
  get id() { return this.props.id };

  /**
   * @return {String}
   */
  get widgetId() { return this.props.widgetId };

  /**
   * @return {String}
   */
  get correlationId() { return this.props.correlationId };

  /**
   * @return {*}
   */
  get body() { return this.props.body };

  toJS = () => ({ ...this.props })
}
