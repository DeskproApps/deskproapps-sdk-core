import * as SdkEvents from '../Core/SdkEvents';

class ContextAPIClient {
  /**
   * @param {EventEmitter} eventDispatcher
   */
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  asyncGet = () => {
    const { eventDispatcher } = this;
    const executor = (resolve, reject) => eventDispatcher.emit(SdkEvents.EVENT_CONTEXTINIT, resolve, reject);
    return new Promise(executor);
  };
}

export default ContextAPIClient;
