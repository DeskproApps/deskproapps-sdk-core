import * as SdkEvents from './SdkEvents';
import * as PostMessageAPI from '../PostMessageAPI';


class DpApp {
  /**
   * @param {ListenerRegistry} listenerRegistry
   * @param {DeskproEventDispatcher} deskproEventDispatcher
   */
  constructor(listenerRegistry, deskproEventDispatcher) {
    this.sdkListenerRegistry = listenerRegistry;
    this.deskproEventDispatcher = deskproEventDispatcher;
  }

  onMount = () => {
    const executor = (resolve, reject) => {
      this.sdkListenerRegistry.add(SdkEvents.EVENT_MOUNT, resolve);
    };
    return new Promise(executor);
  };

  on = (eventName, cb) => {
    this.sdkListenerRegistry.add(eventName, cb);
  };

  /**
   * @return {StateAPIClient}
   */
  state = () => {
    const { asyncDispatch } = this;
    return new PostMessageAPI.StateAPIClient(asyncDispatch);
  };

  /**
   * @return {ContextAPIClient}
   */
  context = () => {
    const { asyncDispatch } = this;
    return new PostMessageAPI.ContextAPIClient(asyncDispatch);
  };

  /**
   * @return {UserAPIClient}
   */
  user = () => {
    const { asyncDispatch } = this;
    return new PostMessageAPI.UserAPIClient(asyncDispatch);
  };

  /**
   * @param {String} eventName
   * @returns {function(*): *}
   */
  dispatch = (eventName, ...args) => {
    const dispatchArgs = [eventName].concat(args);
    const { deskproEventDispatcher } = this;
    deskproEventDispatcher.dispatch.apply(deskproEventDispatcher, dispatchArgs);
  };

  /**
   * @param {Function} cb
   * @param {String} eventName
   * @param args
   */
  asyncDispatch = (cb, eventName, ...args) => {
    // TODO handle reject

    const { sdkListenerRegistry, deskproEventDispatcher } = this;
    const dispatchArgs = [eventName].concat(args);

    sdkListenerRegistry.addOneOff(eventName, cb);
    deskproEventDispatcher.dispatch.apply(deskproEventDispatcher, dispatchArgs);
  };

  log = (...args) => {
    console.log.apply(console, args);
  };
}

export default DpApp;
