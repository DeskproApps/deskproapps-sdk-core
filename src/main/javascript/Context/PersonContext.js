import { Context } from '../Core/Context';

/**
 * @class
 * @extends {Context}
 */
export class PersonContext extends Context
{
  /**
   * @static
   * @readonly
   * @type {string}
   */
  static get TYPE() { return 'person'; }

  /**
   * @method
   * @static
   *
   * @param {EventEmitter} outgoingDispatcher
   * @param {EventEmitter} incomingDispatcher
   * @param {ContextProps} contextProps
   * @return {PersonContext|null}
   */
  static tryAndCreate({outgoingDispatcher, incomingDispatcher, contextProps})
  {
    if (contextProps.contextType === PersonContext.TYPE) {
      const props = { outgoingDispatcher, incomingDispatcher, ...contextProps.toJS(), type: contextProps.contextType };
      return new PersonContext(props);
    }

    return null;
  }
}