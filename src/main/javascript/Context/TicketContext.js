/**
 * @module Context/TicketContext
 */

import { TabContext } from './TabContext';
import { CHANNEL_INCOMING } from '../Core/Event'
import { matchEvent } from './TicketEvents';
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
  static tryAndCreate({outgoingDispatcher, incomingDispatcher, instanceProps, contextProps})
  {
    if (contextProps.contextType === TicketContext.TYPE) {
      const props = {
        outgoingDispatcher,
        incomingDispatcher,
        ...contextProps.toJS(),
        type: contextProps.contextType,
        appId: instanceProps.appId
      };
      return new TicketContext(props);
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
   * @param {string} eventName
   * @param {object} eventHandler
   */
  on = (eventName, eventHandler) => {
    // the event is not an incoming event so we can't subscribe to it
    if (! matchEvent(eventName, { channelType: CHANNEL_INCOMING })) { return; }

    this.props.outgoingDispatcher
      .emitAsync('app.subscribe_to_event', { events: [eventName] })
      .then(() => this.props.incomingDispatcher.on(eventName, eventHandler))
    ;
  };

  /**
   * @public
   * @return {CustomFieldsClient}
   */
  get customFields() {
    const { outgoingDispatcher, appId } = this.props;
    return new CustomFieldsClient({
      outgoingDispatcher,
      appId,
      endpoint: `tickets/${this.entityId}`
    });
  }
}
