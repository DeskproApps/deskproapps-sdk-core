/**
 * This modules handles the creation of specific application contexts
 *
 * @module Context
 */

import ContextFactory from './ContextFactory';
export {ContextFactory};

/**
 * @method
 *
 * @param {AppEventEmitter} outgoingDispatcher
 * @param {AppEventEmitter} incomingDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 * @return {Context}
 */
export function createContext(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps)
{
  const context = ContextFactory.create(
    outgoingDispatcher,
    incomingDispatcher,
    instanceProps,
    contextProps
  );

  if (context) { return context; }

  return ContextFactory.createDefaultContext(
    outgoingDispatcher,
    incomingDispatcher,
    instanceProps,
    contextProps
  );
}


