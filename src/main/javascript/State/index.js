import * as StateEvents from './Events';
import {StateApiFacade} from './StateApiFacade';
import {StateStorageAdapter} from './StateStorageAdapter';
import {LocalStorageAdapter} from './LocalStorageAdapter';

export { StateEvents };

export { registerEventHandlers } from './EventHandlers';
export { StateApiFacade } from './StateApiFacade';

/**
 * @param {EventDispatcher} eventDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 *
 * @return {StateApiFacade}
 */
export const createStateAPIClient = (eventDispatcher, instanceProps, contextProps) => {
  const props = {
    appId: instanceProps.appId,
    instanceId: instanceProps.instanceId,
    entityType: contextProps.contextType,
    entityId: contextProps.entityId
  };

  const env = contextProps.getProperty('appsEnvironment');
  const storageAdapter = env === 'development' ? LocalStorageAdapter.fromGlobals() : new StateStorageAdapter();
  return new StateApiFacade(eventDispatcher, storageAdapter, props);
};


