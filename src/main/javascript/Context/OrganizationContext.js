import { Context } from '../Core/Context';

export class OrganizationContext extends Context
{
  static get TYPE() { return 'organization'; }
}

/**
 * @param {EventDispatcher} outgoingDispatcher
 * @param {EventDispatcher} incomingDispatcher
 * @param {ContextProps} contextProps
 * @return {OrganizationContext}
 */
export const tryAndCreate = ({outgoingDispatcher, incomingDispatcher, contextProps}) =>
{
  if (contextProps.contextType === OrganizationContext.TYPE) {
    const props = { outgoingDispatcher, incomingDispatcher, ...contextProps.toJS(), type: contextProps.contextType };
    return new OrganizationContext(props);
  }

  return null;
};