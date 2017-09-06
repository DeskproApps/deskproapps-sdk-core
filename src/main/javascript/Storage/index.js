/**
 * Storage module.
 * @module Storage
 */

import * as StorageEvents from './Events';
import {StorageApiFacade} from './StorageApiFacade';
import {FetchStorageAdapter} from './FetchStorageAdapter';
import {LocalStorageAdapter} from './LocalStorageAdapter';

export {
  /**
   * @type {module:Storage/Events}
   * @constant
   */
  StorageEvents
};

export {
  /**
   * @method
   */
  registerEventHandlers
} from './EventHandlers';

export {
  /**
   * @type {StorageApiFacade}
   */
  StorageApiFacade
} from './StorageApiFacade';

const storageAdapterProps = (instanceProps, contextProps) =>
{
  return {
    appId: instanceProps.appId,
    instanceId: instanceProps.instanceId,
    contextEntityType: contextProps.contextType,
    contextEntityId: contextProps.entityId
  };
};

/**
 * @method
 *
 * @param {EventDispatcher} eventDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 *
 * @return {StorageApiFacade}
 */
export const createStorageAPIClient = (eventDispatcher, instanceProps, contextProps) => {
  const props = storageAdapterProps(instanceProps, contextProps);
  const env = contextProps.getProperty('appsEnvironment');
  const storageAdapter = env === 'development' ? LocalStorageAdapter.fromGlobals() : new FetchStorageAdapter();
  return new StorageApiFacade(eventDispatcher, storageAdapter, props);
};


