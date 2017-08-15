/**
 * @module Core/AppEventHandlers
 */

import * as Events from './AppEvents';
import { handleOutgoingEvent } from './EventHandler';

/**
 * @method
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 */
export const registerEventHandlers = (windowBridge, app) => {
  handleOutgoingEvent(windowBridge, app, Events.EVENT_RESET_SIZE, Events.props.EVENT_RESET_SIZE);
  handleOutgoingEvent(windowBridge, app, Events.EVENT_SUBSCRIBE, Events.props.EVENT_SUBSCRIBE);
};
