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
  createRequest = (xchild, payload) => {
    const { widgetId } = xchild.props;
    if (!payload) {
      return { widgetId, args: [] };
    }

    if (payload instanceof Array) {
      return { widgetId, args: payload, messageId: this.nextMessageId };
    }

    return { widgetId, args: [payload], messageId: this.nextMessageId };
  }
}

export const MessageFactory = new Factory();