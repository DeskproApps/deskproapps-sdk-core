import OneOffListener from './OneOffListener';

class SdkEventDispatcher {

  /**
   * @param {String} eventName
   * @param {ListenerRegistry} eventListenerRegistry
   * @param {Array} args
   */
  dispatch = (eventName, eventListenerRegistry, ...args) => {
    if (args.length === 1) {
      return this.dispatchMessage(eventName, eventListenerRegistry, args[0]);
    }

    for (const listener of eventListenerRegistry.findAllByEvent(eventName)) {
      if (listener instanceof OneOffListener) {
        eventListenerRegistry.remove(listener);
        listener.callback();
      } else {
        listener();
      }
    }
  };

  /**
   * @param {String} eventName
   * @param {Object} message
   * @param {ListenerRegistry} eventListenerRegistry
   */
  dispatchMessage = (eventName, eventListenerRegistry, message) => {
    for (const listener of eventListenerRegistry.findAllByEvent(eventName)) {
      if (listener instanceof OneOffListener) {
        eventListenerRegistry.remove(listener);
        listener.callback(message);
      } else {
        listener(message);
      }
    }
  };
}

export default SdkEventDispatcher;
