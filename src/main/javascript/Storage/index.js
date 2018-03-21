/**
 * This module exports the interface of the Storage package
 * @module Storage
 */

import * as StorageEvents from './events';
import StorageApiFacade from './StorageApiFacade';
import FetchStorageAdapter from './FetchStorageAdapter';
import LocalStorageAdapter from './LocalStorageAdapter';

export {
  /**
   * @type {module:Storage/events}
   * @constant
   */
  StorageEvents,

  /**
   * @type {StorageApiFacade}
   */
  StorageApiFacade
};


export const registerEventHandlers = () => {};

function storageAdapterProps(instanceProps, contextProps)
{
  return {
    appId: instanceProps.appId,
    instanceId: instanceProps.instanceId,
    contextEntityType: contextProps.contextType,
    contextEntityId: contextProps.entityId
  };
}

/**
 * @method
 *
 * @param {AppEventEmitter} outgoingDispatcher
 * @param {AppEventEmitter} internalDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 *
 * @return {StorageApiFacade}
 */
export const createStorageAPIClient = (outgoingDispatcher, internalDispatcher, instanceProps, contextProps) => {
  const props = storageAdapterProps(instanceProps, contextProps);
  const env = contextProps.getProperty('appsEnvironment');
  const adapter = contextProps.getProperty('appsStorageadapter');

  let storageAdapter = new FetchStorageAdapter();
  if (env === 'development') {
    if (adapter !== 'fetch') {
      storageAdapter = LocalStorageAdapter.fromGlobals();
    }
  }

  return new StorageApiFacade(outgoingDispatcher, internalDispatcher, storageAdapter, props);
};
