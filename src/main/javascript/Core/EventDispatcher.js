/**
 * @module Core/EventDispatcher
 */

import AppEventEmitter from './AppEventEmitter';

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
 * @param {AppEventEmitter} eventDispatcher
 * @return {Promise}
 */
export const emitAsync = (eventDispatcher) =>
{
  const dispatchBinding = dispatch.bind(null, eventDispatcher);
  return Promise.resolve(dispatchBinding);
};

/**
 * @type {AppEventEmitter}
 */
export const IncomingEventDispatcher = new AppEventEmitter();

/**
 * @type {AppEventEmitter}
 */
export const OutgoingEventDispatcher = new AppEventEmitter();

/**
 * @type {AppEventEmitter}
 */
export const InternalEventDispatcher = new AppEventEmitter();

/**
 * @type {AppEventEmitter}
 */
export const MessageBus = new AppEventEmitter();