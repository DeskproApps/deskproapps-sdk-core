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
        appId: instanceProps.appId
      };
      return new PersonContext(props);
    }

    return null;
  }

  /**
   * @constructor
   *
   * @param {string} appId
   * @param {{}} rest
   */
  constructor({appId, ...rest})
  {
    super({appId, ...rest});
  }

  /**
   * @public
   * @return {CustomFieldsClient}
   */
  get customFields() {
    const { outgoingDispatcher, appId } = this.props;
    return new CustomFieldsClient({
      outgoingDispatcher,
      appId,
      endpoint: `people/${this.entityId}`
    });
  }
}