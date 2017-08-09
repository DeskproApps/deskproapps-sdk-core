/**
 * @module Core/EventDispatcher
 */


import { EventEmitter } from 'eventemitter3';
import { Event } from './Event';

/**
 * @param {EventDispatcher} eventDispatcher
 * @param {String} eventName
 * @param {Array} args
 *
 * @return {Promise}
 */
const dispatch = (eventDispatcher, eventName, ...args) => {
  const emitBinding = eventDispatcher.emit.bind(eventDispatcher);

  const executor = (resolve, reject) => {
    const emitArgs = [eventName, resolve, reject].concat(args);
    return emitBinding.apply(null, emitArgs);
  };

  return new Promise(executor);
};

/**
 * @param {EventDispatcher} eventDispatcher
 *
 * @return {Promise}
 */
export const emitAsync = (eventDispatcher) =>
{
  const dispatchBinding = dispatch.bind(null, eventDispatcher);
  return Promise.resolve(dispatchBinding);
};

/**
 * @class
 * @extend {EventEmitter}
 */
export class EventDispatcher extends EventEmitter
{
  /**
   * @public
   * @method
   * @param {string} eventName
   * @param args
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

/**
 * @type {EventDispatcher}
 */
export const IncomingEventDispatcher = new EventDispatcher();

/**
 * @type {EventDispatcher}
 */
export const OutgoingEventDispatcher = new EventDispatcher();

/**
 * @type {EventDispatcher}
 */
export const InternalEventDispatcher = new EventDispatcher();

/**
 * @type {EventDispatcher}
 */
export const MessageBus = new EventDispatcher();