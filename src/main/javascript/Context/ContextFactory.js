import Context from '../Core/Context';

import TicketContext from './TicketContext';
import PersonContext from './PersonContext';
import OrganizationContext from './OrganizationContext';

/**
 * @ignore
 * @type {Array.<function(*):Context>}
 */
const factories = [
  TicketContext.tryAndCreate,
  PersonContext.tryAndCreate,
  OrganizationContext.tryAndCreate
];

/**
 * A factory for application contexts
 *
 * @class
 */
class ContextFactory
{
  /**
   * Returns a list of all the context type it can create:
   *
   *  - ticket ( see {@link TicketContext} )
   *  - organization ( see {@link OrganizationContext} )
   *  - person ( see {@link PersonContext} )
   *
   * @method
   *
   * @returns {Array.<string>}
   */
  static get contextTypes()
  {
    return [
      TicketContext.TYPE,
      PersonContext.TYPE,
      OrganizationContext.TYPE
    ];
  }

  /**
   * Creates a specific type of application context. {@link ContextFactory.contextTypes} returns the list of contexts type names this factory can create
   *
   * @method
   *
   * @param {AppEventEmitter} outgoingDispatcher the outgoing events dispatcher
   * @param {AppEventEmitter} incomingDispatcher the incoming events dispatcher
   * @param {InstanceProps} instanceProps the instance properties bag
   * @param {ContextProps} contextProps the context properties bag
   * @return {Context}
   */
  static create(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps)
  {
    const props = { outgoingDispatcher, incomingDispatcher, instanceProps, contextProps };
    for (const factory of factories) {
      const context = factory(props);
      if (context) { return context; }
    }

    return null;
  }

  /**
   * Creates a generic application context
   *
   * @param {AppEventEmitter} outgoingDispatcher the outgoing events dispatcher
   * @param {AppEventEmitter} incomingDispatcher the incoming events dispatcher
   * @param {InstanceProps} instanceProps the instance properties bag
   * @param {ContextProps} contextProps the context properties bag
   * @return {Context}
   */
  static createDefaultContext(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps)
  {
    const {
      /**
       * @ignore
       * @type {string}
       */
      entityId,
      /**
       * @ignore
       * @type {string}
       */
      locationId,
      ...rest
    } = contextProps.toJS();
    const props = { outgoingDispatcher, incomingDispatcher, entityId, locationId, ...rest, type: contextProps.contextType };
    return new Context(props);
  }
}

export default ContextFactory;