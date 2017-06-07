import { Context } from '../Core/Context';
import { CHANNEL_INCOMING } from '../Core/Event'
import { matchEvent } from './TicketEvents';

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

export const tryAndCreate = props => props.type === TicketContext.TYPE ? new TicketContext(props) : null;