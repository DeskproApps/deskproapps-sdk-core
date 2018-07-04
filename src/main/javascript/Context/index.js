/**
 * This modules handles the creation of specific application contexts
 *
 * @module Context
 */

import ContextFactory from './ContextFactory';
import * as TicketEvents from './eventsTicket';
import * as TabEvents from './eventsTab';
import * as ObjectEvents from './eventsObject';
import { handleOutgoingEvent } from '../Core/EventHandler';

export { ContextFactory, TicketEvents, TabEvents };

/**
 * @function
 *
 * @param {AppEventEmitter} outgoingDispatcher
 * @param {AppEventEmitter} incomingDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 * @return {Context}
 */
export function createContext(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps)
{
  return ContextFactory.create(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps);
}

/**
 * Registers helpdesk window events with the event dispatching system
 *
 * @function
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
export function registerEventHandlers(windowBridge, app) {
  handleOutgoingEvent(windowBridge, app, TabEvents.EVENT_TAB_DATA, TabEvents.props.EVENT_TAB_DATA);
  handleOutgoingEvent(windowBridge, app, TabEvents.EVENT_TAB_ACTIVATE, TabEvents.props.EVENT_TAB_ACTIVATE);
  handleOutgoingEvent(windowBridge, app, TabEvents.EVENT_TAB_CLOSE, TabEvents.props.EVENT_TAB_CLOSE);
  handleOutgoingEvent(windowBridge, app, ObjectEvents.EVENT_CONTEXT_PROPERTY_GET, ObjectEvents.props.EVENT_CONTEXT_PROPERTY_GET);
}