import { EventEmitter } from 'eventemitter3';

/**
 * @param {EventDispatcher} eventDispatcher
 * @param {String} eventName
 * @param {Array} args
 *
 * @return {Promise}
 */
const dispatch = (eventDispatcher, eventName, ...args) => {
  const emitBinding     = eventDispatcher.emit.bind(eventDispatcher);

  const executor = (resolve, reject) => {
    const emitArgs = [eventName, resolve, reject].concat(args);
    return emitBinding.apply(null, emitArgs);
  };

  return new Promise(executor());
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