/**
 * This module exports a factory that creates the various context implementations
 * @module Context/ContextFactory
 */

import Context from '../Core/Context';

import TicketContext from './TicketContext';
import PersonContext from './PersonContext';
import OrganizationContext from './OrganizationContext';


/**
 * @readonly
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
   * Returns a list of the all context types it can create
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
   * @param {AppEventEmitter} outgoingDispatcher the outgoing events dispatcher
   * @param {AppEventEmitter} incomingDispatcher the incoming events dispatcher
   * @param {InstanceProps} instanceProps the instance properties bag
   * @param {ContextProps} contextProps the context properties bag
   * @return Context {module:Core/Context.Context}
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
   * @param {AppEventEmitter} outgoingDispatcher the outgoing events dispatcher
   * @param {AppEventEmitter} incomingDispatcher the incoming events dispatcher
   * @param {InstanceProps} instanceProps the instance properties bag
   * @param {ContextProps} contextProps the context properties bag
   * @return Context {module:Core/Context.Context}
   */
  static createDefaultContext(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps)
  {
    const {
      /** @var {String} */ entityId,
      /** @var {String} */ locationId,
      ...rest
    } = contextProps.toJS();
    const props = { outgoingDispatcher, incomingDispatcher, entityId, locationId, ...rest, type: contextProps.contextType };
    return new Context(props);
  }
}

export default ContextFactory;