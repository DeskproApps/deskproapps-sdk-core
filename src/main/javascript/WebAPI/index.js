/**
 * UI module.
 * @module WebAPI
 */

import * as WebAPIEvents from './events';
import { handleOutgoingEvent } from '../Core/EventHandler';

/**
 * Registers the WebAPI events with the event dispatching system
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 */
function registerEventHandlers(windowBridge, app)
{
  "use strict";
  handleOutgoingEvent(windowBridge, app, WebAPIEvents.EVENT_WEBAPI_REQUEST_DESKPRO, WebAPIEvents.props.EVENT_WEBAPI_REQUEST_DESKPRO);
  handleOutgoingEvent(windowBridge, app, WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, WebAPIEvents.props.EVENT_WEBAPI_REQUEST_FETCH);
}


export {
  /**
   * @type {module:WebAPI/Events}
   */
  WebAPIEvents
}

export {
  /**
   * @function
   */
  create as createDeskproApiClient
} from './DeskproAPIClient';


export {
  /**
   * @function
   */
  registerEventHandlers
}