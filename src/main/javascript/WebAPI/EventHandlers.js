/**
 * WebAPI/EventHandlers module.
 * @module WebAPI/EventHandlers
 */

import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

/**
 * @method
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 */
export const registerEventHandlers = (windowBridge, app) => {
  handleOutgoingEvent(windowBridge, app, Events.EVENT_WEBAPI_REQUEST_DESKPRO, Events.props.EVENT_WEBAPI_REQUEST_DESKPRO);
  handleOutgoingEvent(windowBridge, app, Events.EVENT_WEBAPI_REQUEST_FETCH, Events.props.EVENT_WEBAPI_REQUEST_FETCH);
};
