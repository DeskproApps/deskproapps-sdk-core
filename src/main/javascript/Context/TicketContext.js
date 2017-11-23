/**
 * @module Context/TicketContext
 */

import { TabContext } from './TabContext';
import { CustomFieldsClient } from '../CustomFields';

/**
 * @class
 * @extends {Context}
 */
export class TicketContext extends TabContext
{
  /**
   * @static
   * @readonly
   * @type {string}
   */
  static get TYPE() { return 'ticket'; }

  /**
   * @method
   * @static
   *
   * @param {EventDispatcher} outgoingDispatcher
   * @param {EventDispatcher} incomingDispatcher
   * @param {InstanceProps} instanceProps
   * @param {ContextProps} contextProps
   * @return {TicketContext|null}
   */
  static tryAndCreate({ outgoingDispatcher, incomingDispatcher, instanceProps, contextProps})
  {
    if (contextProps.contextType === TicketContext.TYPE) {
      const props = {
        outgoingDispatcher,
        incomingDispatcher,
        ...contextProps.toJS(),
        type: contextProps.contextType,
        instanceId: instanceProps.instanceId
      };
      return new TicketContext(props);
    }

    return null;
  }

  /**
   * @constructor
   *
   * @param {string} instanceId
   * @param {{}} rest
   */
  constructor({instanceId, ...rest})
  {
    super({instanceId, ...rest});
  }

  /**
   * @public
   * @return {CustomFieldsClient}
   */
  get customFields() {
    const { outgoingDispatcher, instanceId } = this.props;
    return new CustomFieldsClient({
      outgoingDispatcher,
      instanceId,
      endpoint: `tickets/${this.entityId}`
    });
  }
}
