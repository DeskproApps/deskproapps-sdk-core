import { Context } from '../Core/Context';

/**
 * @class
 * @extends {Context}
 */
export class OrganizationContext extends Context
{
  /**
   * @static
   * @readonly
   * @type {string}
   */
  static get TYPE() { return 'organization'; }

  /**
   * @method
   * @static
   *
   * @param {EventEmitter} outgoingDispatcher
   * @param {EventEmitter} incomingDispatcher
   * @param {ContextProps} contextProps
   * @return {OrganizationContext|null}
   */
  static tryAndCreate({outgoingDispatcher, incomingDispatcher, contextProps})
  {
    if (contextProps.contextType === OrganizationContext.TYPE) {
      const props = { outgoingDispatcher, incomingDispatcher, ...contextProps.toJS(), type: contextProps.contextType };
      return new OrganizationContext(props);
    }

    return null;
  }
}
