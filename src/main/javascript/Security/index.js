/**
 * This module exports the interface of the Security package
 *
 * @module Security
 */

import * as SecurityEvents from './events';
import OauthFacade from './OauthFacade';
export {
  /**
   * @type {module:Security/events}
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
   * @function
   */
  registerEventHandlers
} from './events';

import { createStorageAPIClient } from '../Storage';

/**
 * @function
 *
 * @param {AppEventEmitter} outgoingDispatcher
 * @param {AppEventEmitter} internalDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 * @return {OauthFacade}
 */
export const createOauthAPIClient = (outgoingDispatcher, internalDispatcher, instanceProps, contextProps) => {
  const storageClient = createStorageAPIClient(outgoingDispatcher, internalDispatcher, instanceProps, contextProps);
  const setStorage = storageClient.setAppStorage.bind(storageClient);

  return new OauthFacade(outgoingDispatcher, setStorage);
};