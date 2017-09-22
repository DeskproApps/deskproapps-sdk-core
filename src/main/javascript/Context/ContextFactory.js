import {Context} from '../Core/Context';

import { TicketContext } from './TicketContext';
import { PersonContext } from './PersonContext';
import { OrganizationContext } from './OrganizationContext';


/**
 * @readonly
 * @type {Array.<function>}
 */
const factories = [
  TicketContext.tryAndCreate,
  PersonContext.tryAndCreate,
  OrganizationContext.tryAndCreate
];

export class ContextFactory
{
  static get contextTypes()
  {
    return [
      TicketContext.TYPE,
      PersonContext.TYPE,
      OrganizationContext.TYPE
    ];
  }

  /**
   * @method
   *
   * @param {EventDispatcher} outgoingDispatcher
   * @param {EventDispatcher} incomingDispatcher
   * @param {InstanceProps} instanceProps
   * @param {ContextProps} contextProps
   * @return {Context}
   */
  static create(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps)
  {
    const props = {outgoingDispatcher, incomingDispatcher, instanceProps, contextProps};
    for (const factory of factories) {
      let context = factory(props);
      if (context) { return context; }
    }

    return ContextFactory.createDefaultContext(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps);
  }

  /**
   * @param {EventDispatcher} outgoingDispatcher
   * @param {EventDispatcher} incomingDispatcher
   * @param {InstanceProps} instanceProps
   * @param {ContextProps} contextProps
   * @return {Context}
   */
  static createDefaultContext(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps)
  {
    const props = { outgoingDispatcher, incomingDispatcher, ...contextProps.toJS(), type: contextProps.contextType };
    return new Context(props);
  }
}