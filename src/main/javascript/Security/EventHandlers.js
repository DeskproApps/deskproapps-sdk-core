/**
 * Security/EventHandlers module.
 * @module Security/EventHandlers
 */

import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

/**
 * @method
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 */
export const registerEventHandlers = (windowBridge, app) => {
  handleOutgoingEvent(windowBridge, app, Events.EVENT_SECURITY_AUTHENTICATE_OAUTH, Events.props.EVENT_SECURITY_AUTHENTICATE_OAUTH);
  handleOutgoingEvent(windowBridge, app, Events.EVENT_SECURITY_SETTINGS_OAUTH, Events.props.EVENT_SECURITY_SETTINGS_OAUTH);
};
