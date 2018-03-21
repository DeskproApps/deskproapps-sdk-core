/**
 * This modules handles the creation of specific application contexts
 *
 * @module Context
 */

import ContextFactory from './ContextFactory';
import * as TicketEvents from './eventsTicket';

export { ContextFactory, TicketEvents };

/**
 * @function
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


