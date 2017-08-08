/**
 * @module Context/PersonContext
 */

import { Context } from '../Core/Context';

/**
 * @class
 * @extends {Context}
 */
export class PersonContext extends Context
{
  static get TYPE() { return 'person'; }
}

/**
 * @method
 *
 * @param {EventDispatcher} outgoingDispatcher
 * @param {EventDispatcher} incomingDispatcher
 * @param {ContextProps} contextProps
 * @return {PersonContext}
 */
export const tryAndCreate = ({outgoingDispatcher, incomingDispatcher, contextProps}) =>
{
  if (contextProps.contextType === PersonContext.TYPE) {
    const props = { outgoingDispatcher, incomingDispatcher, ...contextProps.toJS(), type: contextProps.contextType };
    return new PersonContext(props);
  }

  return null;
};
