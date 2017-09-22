/**
 * @module Context
 */

import { registerEventHandlers as registerTicketEventHandlers } from './TicketEventHandlers';
export { registerTicketEventHandlers };

import * as TicketEvents from './TicketEvents';
export { TicketEvents };

import {ContextFactory} from './ContextFactory';
export {ContextFactory};

/**
 * @method
 *
 * @param {EventDispatcher} outgoingDispatcher
 * @param {EventDispatcher} incomingDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 * @return {Context}
 */
export const createContext = (outgoingDispatcher, incomingDispatcher, instanceProps, contextProps) =>
{
  return ContextFactory.create(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps);
};


