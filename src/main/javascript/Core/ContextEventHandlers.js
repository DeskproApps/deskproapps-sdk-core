/**
 * @module Core/ContextEventHandlers
 */

import * as Events from './ContextEvents';
import { handleOutgoingEvent } from './EventHandler';

/**
 * @method
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 */
export const registerEventHandlers = (windowBridge, app) => {
  handleOutgoingEvent(windowBridge, app, Events.EVENT_ME_GET, Events.props.EVENT_ME_GET);
  handleOutgoingEvent(windowBridge, app, Events.EVENT_TAB_DATA, Events.props.EVENT_TAB_DATA);
  handleOutgoingEvent(windowBridge, app, Events.EVENT_TAB_ACTIVATE, Events.props.EVENT_TAB_ACTIVATE);
  handleOutgoingEvent(windowBridge, app, Events.EVENT_TAB_CLOSE, Events.props.EVENT_TAB_CLOSE);
};