import { Context } from '../Core/Context';
import Event from '../Core/Event';

import * as TicketEvents from './TicketEvents';

export class TicketContext extends Context
{
  static get TYPE() { return 'ticket'; }

  on = (eventName, eventHandler) => { this.props.incomingDispatcher.on(eventName, eventHandler); }
}

export const tryAndCreate = props => props.type === TicketContext.TYPE ? new TicketContext(props) : null;