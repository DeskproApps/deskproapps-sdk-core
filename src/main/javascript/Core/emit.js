/**
 * This module exports {@link AppEventEmitter} objects which are used as event buses to handle application message
 * @module Core/emit
 */

import AppEventEmitter from './AppEventEmitter';

/**
 * @ignore
 * @internal
 *
 * @param {AppEventEmitter} eventDispatcher
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
 * A substitute for `AppEventEmitter.emit`
 *
 * @function
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