import { TicketContext } from './TicketContext';


export const types = [
  TicketContext.TYPE
];

/**
 * @param {EventEmitter} eventDispatcher
 * @param {ContextProps} contextProps
 * @return {Context}
 */
export const createContext = (eventDispatcher, contextProps) => {
  if (types.indexOf(contextProps.type) === -1) {
    throw new Error(`unknown context type ${contextProps.type}. Valid context types are: ${types.join(', ')}`);
  }

  const props = { eventDispatcher, ...contextProps };
  return new TicketContext(props);
};

