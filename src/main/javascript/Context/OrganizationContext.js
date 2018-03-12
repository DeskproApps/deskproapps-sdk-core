import UITabContext from './UITabContext';
import { CustomFieldsClient } from '../CustomFields';

/**
 * Implementation of an Organization Entity application context
 *
 * @class
 * @extends {UITabContext}
 */
class OrganizationContext extends UITabContext
{
  /**
   * @static
   * @readonly
   * @type {string}
   */
  static get TYPE() { return 'organization'; }

  /**
   * Creates an {@link OrganizationContext} otherwise returns null
   *
   * @method
   * @static
   *
   * @param {AppEventEmitter} outgoingDispatcher the outgoing events dispatcher
   * @param {AppEventEmitter} incomingDispatcher the incoming events dispatcher
   * @param {InstanceProps} instanceProps the instance properties bag
   * @param {ContextProps} contextProps the context properties bag
   * @return {OrganizationContext|null}
   */
  static tryAndCreate({outgoingDispatcher, incomingDispatcher, instanceProps, contextProps})
  {
    if (contextProps.contextType === OrganizationContext.TYPE) {
      const props = {
        outgoingDispatcher,
        incomingDispatcher,
        ...contextProps.toJS(),
        type: contextProps.contextType,
        instanceId: instanceProps.instanceId
      };
      return new OrganizationContext(props);
    }

    return null;
  }

  /**
   * @constructor
   *
   * @param {string} instanceId
   * @param {...*} rest
   */
  constructor({instanceId, ...rest})
  {
    super({instanceId, ...rest});
  }

  /**
   * Returns an API client object that can perform operations on the custom fields belonging to the current Organization
   *
   * @public
   * @return {CustomFieldsClient}
   */
  get customFields() {
    const { outgoingDispatcher, instanceId } = this.props;
    return new CustomFieldsClient({
      outgoingDispatcher,
      instanceId,
      endpoint: `organizations/${this.entityId}`
    });
  }
}

export default OrganizationContext