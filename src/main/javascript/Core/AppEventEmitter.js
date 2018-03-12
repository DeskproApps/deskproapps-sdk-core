import { EventEmitter} from 'eventemitter3';
import { Event } from './Event';

/**
 * The internal EventEmitter used by the application to communicate with the helpdesk UI hosting the application and the
 * own UI container implementation
 *
 * @class
 * @extends {EventEmitter}
 * @see https://github.com/primus/eventemitter3
 */
class AppEventEmitter extends EventEmitter
{
  /**
   * Shortcut for on('invoke', handler)
   *
   * @param {function}  handler
   */
  onInvoke(handler)
  {
    this.on('invoke', handler);
  }

  /**
   * Shortcut for emitAsync('invoke', ...args)
   *
   * @public
   * @method
   *
   * @param {...*} args
   * @returns {Promise.<*, Error>}
   */
  emitInvokeAsync(...args)
  {
    return this.emitAsync.apply(this, ['invoke'].concat(args));
  }

  /**
   * Calls each listener registered for the event named `eventName` adding the resolve and reject callbacks of the
   * promise being returned.
   *
   * @public
   * @method
   * @param {string} eventName
   * @param [args]
   * @return {Promise.<*, *>}
   */
  emitAsync = (eventName, ...args) => {
    const executor = (resolve, reject) => {
      this.emit.apply(this, [eventName, resolve, reject].concat(args));
    };
    return new Promise(executor);
  };

  /**
   * Creates a closure with the same signature as `emit` which will emit the only after the listeners of the `beforeEventName` allow it.
   * Each `beforeEventName` listener will receive the same instance of {@link Event} which they can enable or disable
   *
   * @public
   * @method
   *
   * @param {String} beforeEventName
   * @param {function} onBeforeEmit a callback invoked before the event is emitted
   * @return function {AppEventEmitter~emit}
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

/**
 * Event emitter function
 *
 * @callback AppEventEmitter~emit
 * @param {String} eventName
 * @param {...args} args
 */