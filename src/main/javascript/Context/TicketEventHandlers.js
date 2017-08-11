/**
 * @module Context/TicketEventHandlers
 */

import { handleIncomingEvent } from '../Core/EventHandler';
import * as Events from './TicketEvents';

/**
 * @method
 * @param {App} app
 */
export const registerEventHandlers = (app) => {
  handleIncomingEvent(app, Events.EVENT_TICKET_REPLY, Events.props.EVENT_TICKET_REPLY)
};
