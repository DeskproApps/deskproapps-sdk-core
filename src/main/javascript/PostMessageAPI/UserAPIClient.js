import * as SdkEvents from './Events';

class UserAPIClient {
  /**
   * @param {EventDispatcher} eventDispatcher
   */
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  asyncGet = () => this.eventDispatcher.emitAsync(SdkEvents.EVENT_USER_GET);
}

export default UserAPIClient;
