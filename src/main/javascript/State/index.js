import * as StateEvents from './Events';
import {StateApiFacade} from './StateApiFacade';
import {FetchAdapter} from './FetchStorageAdapter';
import {LocalStorageAdapter} from './LocalStorageAdapter';

export { StateEvents };

export { registerEventHandlers } from './EventHandlers';
export { StateApiFacade } from './StateApiFacade';

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
 * @param {EventDispatcher} eventDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 *
 * @return {StateApiFacade}
 */
export const createStateAPIClient = (eventDispatcher, instanceProps, contextProps) => {
  const props = storageAdapterProps(instanceProps, contextProps);
  const env = contextProps.getProperty('appsEnvironment');
  const storageAdapter = env === 'development' ? LocalStorageAdapter.fromGlobals() : new FetchAdapter();
  return new StateApiFacade(eventDispatcher, storageAdapter, props);
};


