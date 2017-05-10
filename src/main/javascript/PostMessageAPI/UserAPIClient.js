import * as SdkEvents from '../Core/SdkEvents';

class UserAPIClient {
  /**
   * @param {EventEmitter} eventDispatcher
   */
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  asyncGet = () => {
    const { eventDispatcher } = this;
    const executor = (resolve, reject) => eventDispatcher.emit(SdkEvents.EVENT_USER_GET, resolve, reject);
    return new Promise(executor);
  };
}

export default UserAPIClient;
