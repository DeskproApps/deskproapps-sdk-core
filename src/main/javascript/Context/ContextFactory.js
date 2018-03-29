import Context from '../Core/Context';
import { CustomFieldsClient } from '../CustomFields';
import ContextObject from '../Core/ContextObject';
import ContextHostUITab from './ContextHostUITab';

/**
 * @ignore
 *
 * @param {AppEventEmitter} outgoingDispatcher the outgoing events dispatcher
 * @param {AppEventEmitter} incomingDispatcher the incoming events dispatcher
 * @param {InstanceProps} instanceProps the instance properties bag
 * @param {ContextProps} contextProps the context properties bag
 *
 * @return {CustomFieldsClient|null}
 */
function createCustomFieldClient({outgoingDispatcher, incomingDispatcher, instanceProps, contextProps})
{
  let endpoint = null;
  switch (contextProps.contextType) {
    case 'person':
      endpoint = `people/${contextProps.entityId}`;
      break;
    case 'organization':
      endpoint = `organizations/${contextProps.entityId}`;
      break;
    case 'ticket':
      endpoint = `tickets/${contextProps.entityId}`;
      break;
  }

  if (endpoint) {
    return new CustomFieldsClient({
      outgoingDispatcher,
      instanceId: instanceProps.instanceId,
      endpoint
    });
  }

  return null;
}

/**
 * A factory for application contexts
 *
 * @class
 */
class ContextFactory
{
  /**
   * Returns a list of all the Deskpro Object context type names it can create
   *
   * @method
   * @returns {Array.<string>}
   */
  static get contextObjectTypes()
  {
    return [
      'ticket',
      'person',
      'organization'
    ];
  }

  /**
   * Creates the application context
   *
   * @method
   *
   * @param {AppEventEmitter} outgoingDispatcher the outgoing events dispatcher
   * @param {AppEventEmitter} incomingDispatcher the incoming events dispatcher
   * @param {InstanceProps} instanceProps the instance properties bag
   * @param {ContextProps} contextProps the context properties bag
   * @return {Context}
   */
  static create(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps)
  {
    const customFields = createCustomFieldClient({ outgoingDispatcher, incomingDispatcher, instanceProps, contextProps });

    const object = new ContextObject({
      type: contextProps.contextType,
      entityId: contextProps.entityId,
      customFields
    });
    const hostUI = new ContextHostUITab({ outgoingDispatcher, ...contextProps.toJS()});

    const props = { outgoingDispatcher, hostUI, object, ...contextProps.toJS(), ...instanceProps.toJS() };
    return new Context(props);
  }
}

export default ContextFactory;