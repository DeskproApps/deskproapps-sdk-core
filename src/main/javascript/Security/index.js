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

import { createStorageAPIClient } from '../Storage';

/**
 * @method
 *
 * @param eventDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 * @return {OauthFacade}
 */
export const createOauthAPIClient = (eventDispatcher, instanceProps, contextProps) => {
  const storageClient = createStorageAPIClient(eventDispatcher, instanceProps, contextProps);
  const setStorage = storageClient.setAppStorage.bind(storageClient);

  const props = { ...instanceProps.toJS(), ...contextProps.toJS()};
  return new OauthFacade(eventDispatcher, setStorage, props);
};