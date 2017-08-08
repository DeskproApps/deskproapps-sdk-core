/**
 * @module Context/TicketContext
 */

import { Context } from '../Core/Context';
import { CHANNEL_INCOMING } from '../Core/Event'
import { matchEvent } from './TicketEvents';

/**
 * @class
 * @extends {Context}
 */
export class TicketContext extends Context
{
  static get TYPE() { return 'ticket'; }

  on = (eventName, eventHandler) => {
    // the event is not an incoming event so we can't subscribe to it
    if (! matchEvent(eventName, { channelType: CHANNEL_INCOMING })) { return; }

    this.props.outgoingDispatcher
      .emitAsync('app.subscribe_to_event', { events: [eventName] })
      .then(() => this.props.incomingDispatcher.on(eventName, eventHandler))
    ;
  }
}

/**
 * @method
 *
 * @param {EventDispatcher} outgoingDispatcher
 * @param {EventDispatcher} incomingDispatcher
 * @param {ContextProps} contextProps
 * @return {TicketContext}
 */
export const tryAndCreate = ({outgoingDispatcher, incomingDispatcher, contextProps}) =>
{
  if (contextProps.contextType === TicketContext.TYPE) {
    const props = { outgoingDispatcher, incomingDispatcher, ...contextProps.toJS(), type: contextProps.contextType };
    return new TicketContext(props);
  }

  return null;
};