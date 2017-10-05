import { TabContext } from './TabContext';
import { CustomFieldsClient } from '../CustomFields';

/**
 * @class
 * @extends {Context}
 */
export class PersonContext extends TabContext
{
  /**
   * @static
   * @readonly
   * @type {string}
   */
  static get TYPE() { return 'person'; }

  /**
   * @method
   * @static
   *
   * @param {EventDispatcher} outgoingDispatcher
   * @param {EventDispatcher} incomingDispatcher
   * @param {InstanceProps} instanceProps
   * @param {ContextProps} contextProps
   * @return {PersonContext|null}
   */
  static tryAndCreate({outgoingDispatcher, incomingDispatcher, instanceProps, contextProps})
  {
    if (contextProps.contextType === PersonContext.TYPE) {
      const props = {
        outgoingDispatcher,
        incomingDispatcher,
        ...contextProps.toJS(),
        type: contextProps.contextType,
        instanceId: instanceProps.instanceId
      };
      return new PersonContext(props);
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
      endpoint: `people/${this.entityId}`
    });
  }
}