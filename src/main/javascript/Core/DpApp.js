import * as PostMessageAPI from '../PostMessageAPI';

class DpApp {
  /**
   * @param {EventEmitter} eventDispatcher
   */
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  on = (eventName, cb) => {
    this.sdkListenerRegistry.add(eventName, cb);
  };

  /**
   * @return {StateAPIClient}
   */
  state = () => {
    const { eventDispatcher } = this;
    return new PostMessageAPI.StateAPIClient(eventDispatcher);
  };

  /**
   * @return {ContextAPIClient}
   */
  context = () => {
    const { eventDispatcher } = this;
    return new PostMessageAPI.ContextAPIClient(eventDispatcher);
  };

  /**
   * @return {UserAPIClient}
   */
  user = () => {
    const { eventDispatcher } = this;
    return new PostMessageAPI.UserAPIClient(eventDispatcher);
  };

  log = (...args) => {
    console.log.apply(console, args);
  };
}

export default DpApp;
