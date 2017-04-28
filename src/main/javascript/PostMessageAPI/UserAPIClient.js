import * as SdkEvents from '../Core/SdkEvents';

class UserAPIClient {
  /**
   * @param {Function} eventDispatcher
   */
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  asyncGet = () => {
    const { eventDispatcher } = this;
    const executor = (resolve, reject) => {
      eventDispatcher(resolve, SdkEvents.EVENT_USER_GET);
    };
    return new Promise(executor);
  };
}

export default UserAPIClient;
