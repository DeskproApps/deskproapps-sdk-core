import { EventEmitter } from 'eventemitter3';

/**
 * @param {Function} executor
 * @return {Promise}
 */
const createPromise = (executor) => new Promise(executor);

/**
 * @param {EventDispatcher} eventDispatcher
 * @return {Promise}
 */
export const createEmitAsync = (eventDispatcher) => {
  "use strict";

  const emit = (args) => eventDispatcher.emit.apply(eventDispatcher, args);
  const reduce =  (cb, eventName, args, resolve, reject) => cb([eventName, resolve, reject].concat(args));
  const dispatch = (eventName, ...args) => {
    const executor = reduce.bind(null, emit, eventName, args);
    return new Promise(executor);
  };

  return new Promise((resolve, reject) => resolve(dispatch));
};



export class EventDispatcher extends EventEmitter
{
  emitAsync = (eventName, ...args) => {
    const executor = (resolve, reject) => {
      this.emit.apply(this, [eventName, resolve, reject].concat(args));
    };
    return new Promise(executor);
  };

  /**
   * @param {String} beforeEventName
   * @param {String} eventName
   * @param {function} dispatchEmit
   * @return {EventDispatcher}
   */
  emitIfNotCanceled = (beforeEventName, eventName, dispatchEmit) =>
  {
    const event = new Event({ name: eventName });
    this.emit(beforeEventName, event);

    if (event.enabled) {
      dispatchEmit(this.emit.bind(this, eventName));
    }

    return this;
  };
}

export const IncomingEventDispatcher = new EventDispatcher();
export const OutgoingEventDispatcher = new EventDispatcher();
export const InternalEventDispatcher = new EventDispatcher();

export const MessageBus = new EventDispatcher();