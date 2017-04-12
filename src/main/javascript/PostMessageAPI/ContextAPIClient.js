import * as SdkEvents from '../Core/SdkEvents';

class ContextAPIClient {
  /**
   * @param {Function} eventDispatcher
   */
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  asyncGet = () => {
    const { eventDispatcher } = this;
    const executor = (resolve, reject) => {
      eventDispatcher(resolve, SdkEvents.EVENT_CONTEXTINIT);
    };
    return new Promise(executor);
  };
}

export default ContextAPIClient;
