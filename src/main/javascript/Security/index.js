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
 * @param {EventDispatcher} outgoingDispatcher
 * @param {EventDispatcher} internalDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 * @return {OauthFacade}
 */
export const createOauthAPIClient = (outgoingDispatcher, internalDispatcher, instanceProps, contextProps) => {
  const storageClient = createStorageAPIClient(outgoingDispatcher, internalDispatcher, instanceProps, contextProps);
  const setStorage = storageClient.setAppStorage.bind(storageClient);

  return new OauthFacade(outgoingDispatcher, setStorage);
};