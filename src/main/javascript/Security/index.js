/**
 * Security module.
 * @module Security
 */

import * as SecurityEvents from './Events';
import { OauthFacade } from './OauthFacade';
export {
  /**
   * @type {module:Security/Events}
   */
  SecurityEvents
};
export {
  /**
   * @type {OauthToken}
   */
  OauthToken
}  from './OauthToken';
export {
  /**
   * @method
   */
  registerEventHandlers
} from './EventHandlers';

import { createStateAPIClient } from '../State';

/**
 * @method
 *
 * @param eventDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 * @return {OauthFacade}
 */
export const createOauthAPIClient = (eventDispatcher, instanceProps, contextProps) => {
  const stateClient = createStateAPIClient(eventDispatcher, instanceProps, contextProps);
  const setState = stateClient.setAppState.bind(stateClient);

  const props = { ...instanceProps.toJS(), ...contextProps.toJS()};
  return new OauthFacade(eventDispatcher, setState, props);
};