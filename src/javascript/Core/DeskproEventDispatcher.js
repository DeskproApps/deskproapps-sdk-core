/**
 * This class sends messages to the deskpro window
 */
class DeskproEventDispatcher {
  /**
   * @param {WindowProxy} windowProxy
   */
  constructor(windowProxy) {
    this.windowProxy = windowProxy;
  }

  dispatch = (eventname, ...args) => {
    const { props } = this.windowProxy.xchild;
    const message = {
      widgetId: props.widgetId,
      args
    };
    props.onDpMessage(eventname, message);
  }

}

export default DeskproEventDispatcher;
