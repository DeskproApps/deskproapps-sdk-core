class Factory
{
  constructor() {
    this.state = { messageId: 0 };
  }

  get nextMessageId() {
    this.state.messageId++;
    return this.state.messageId;
  }

  /**
   * @param {ChildComponent} xchild
   * @param {*} payload
   * @return {*}
   */
  createRequestResponse = (xchild, payload) =>
  {
    const { widgetId } = xchild.props;
    if (!payload) {
      return { widgetId, args: [] };
    }

    if (payload instanceof Array) {
      return { widgetId, args: payload, messageId: this.nextMessageId };
    }

    return { widgetId, args: [payload], messageId: this.nextMessageId, commType: 'request-response' };
  };

  /**
   * @param {ChildComponent} xchild
   * @param {*} payload
   * @return {*}
   */
  createFireAndForget = (xchild, payload) =>
  {
    const message = this.createRequestResponse(xchild, payload);
    const { commType, ...others } = message;

    return { ... others, commType: 'fire-and-forget'};
  }
}

export const MessageFactory = new Factory();