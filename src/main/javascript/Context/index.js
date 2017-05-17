import { TicketContext, tryAndCreate as TicketContextFactory } from './TicketContext';
import { PersonContext, tryAndCreate as PersonContextFactory } from './PersonContext';
import { OrganizationContext, tryAndCreate as OrganizationContextFactory } from './OrganizationContext';

export const types = [
  TicketContext.TYPE,
  PersonContext.TYPE,
  OrganizationContext.TYPE
];

export const factories = [
  TicketContextFactory,
  PersonContextFactory,
  OrganizationContextFactory
];

/**
 * @param {EventEmitter} eventDispatcher
 * @param {ContextProps} contextProps
 * @return {Context}
 */
export const createContext = (eventDispatcher, contextProps) =>
{
  const props = { eventDispatcher, ...contextProps.toJS() };
  let context = null;
  for (const factory of factories) {
    context = factory(props);
    if (context) { return context; }
  }

  throw new Error(`unknown context type ${contextProps.type}. Valid context types are: ${types.join(', ')}`);
};

