import { handleIncomingEvent } from '../Core/EventHandler';
import * as Events from './TicketEvents';

export const registerEventHandlers = () => {
  handleIncomingEvent( Events.EVENT_TICKET_REPLY, Events.props.EVENT_TICKET_REPLY  )
};
