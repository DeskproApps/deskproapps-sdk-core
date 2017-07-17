import * as StateEvents from './Events';
import {StateApiFacade} from './StateApiFacade';

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
    instanceId: instanceProps.instanceId,
    entityType: contextProps.contextType,
    entityId: contextProps.entityId
  };
  return new StateApiFacade(eventDispatcher, props);
};


