/**
 * @module Context/TicketEventHandlers
 */

import { handleIncomingEvent } from '../Core/EventHandler';
import * as Events from './TicketEvents';

/**
 * @method
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 */
export const registerEventHandlers = (windowBridge, app) => {
  handleIncomingEvent(windowBridge, app, Events.EVENT_TICKET_REPLY, Events.props.EVENT_TICKET_REPLY)
};
