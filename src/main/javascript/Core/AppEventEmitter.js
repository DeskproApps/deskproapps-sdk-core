import { EventEmitter} from 'eventemitter3';
import { Event } from './Event';

/**
 * @class
 * @extends {EventEmitter}
 */
class AppEventEmitter extends EventEmitter
{
  /**
   *
   * @param handler
   */
  onInvoke(handler)
  {
    this.on('invoke', handler);
  }

  /**
   * @public
   * @method
   *
   * @return {Promise}
   */
  emitInvokeAsync(...args)
  {
    return this.emitAsync.apply(this, ['invoke'].concat(args));
  }

  /**
   * @public
   * @method
   * @param {string} eventName
   * @param [args]
   * @return {Promise}
   */
  emitAsync = (eventName, ...args) => {
    const executor = (resolve, reject) => {
      this.emit.apply(this, [eventName, resolve, reject].concat(args));
    };
    return new Promise(executor);
  };

  /**
   * @public
   * @method
   *
   * @param {String} beforeEventName
   * @param {function} onBeforeEmit
   * @return {function()}
   */
  emitCancelable = (beforeEventName, onBeforeEmit) => (eventName, ...args) =>
  {
    const event = new Event({ name: eventName, args });
    this.emit(beforeEventName, event);

    if (event.enabled) {
      onBeforeEmit();
      this.emit.apply(this, [eventName].concat(args));
    }
  };
}

export default AppEventEmitter;