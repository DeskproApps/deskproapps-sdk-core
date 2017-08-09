/**
 * @module Context
 */

import { TicketContext } from './TicketContext';
import { registerEventHandlers as registerTicketEventHandlers } from './TicketEventHandlers';
export { registerTicketEventHandlers };

import { PersonContext } from './PersonContext';
import { OrganizationContext } from './OrganizationContext';

import * as TicketEvents from './TicketEvents';
export { TicketEvents };

/**
 * @readonly
 * @type {Array.<String>}
 */
export const types = [
  TicketContext.TYPE,
  PersonContext.TYPE,
  OrganizationContext.TYPE
];

/**
 * @readonly
 * @type {Array.<function>}
 */
export const factories = [
  TicketContext.tryAndCreate,
  PersonContext.tryAndCreate,
  OrganizationContext.tryAndCreate
];

/**
 * @method
 *
 * @param {EventEmitter} outgoingDispatcher
 * @param {EventEmitter} incomingDispatcher
 * @param {ContextProps} contextProps
 * @return {Context}
 */
export const createContext = (outgoingDispatcher, incomingDispatcher, contextProps) =>
{
  const props = {outgoingDispatcher, incomingDispatcher, contextProps};
  for (const factory of factories) {
    let context = factory(props);
    if (context) { return context; }
  }

  throw new Error(`unknown context type ${contextProps.contextType}. Valid context types are: ${types.join(', ')}`);
};


