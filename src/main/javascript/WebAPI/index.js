/**
 * This module exports the interface of the WebAPI package
 * @module WebAPI
 */

import DeskproAPIClient from './DeskproAPIClient'
import * as WebAPIEvents from './events';
import { handleOutgoingEvent } from '../Core/EventHandler';

/**
 * Registers the WebAPI events with the event dispatching system
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
function registerEventHandlers(windowBridge, app)
{
  "use strict";
  handleOutgoingEvent(windowBridge, app, WebAPIEvents.EVENT_WEBAPI_REQUEST_DESKPRO, WebAPIEvents.props.EVENT_WEBAPI_REQUEST_DESKPRO);
  handleOutgoingEvent(windowBridge, app, WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, WebAPIEvents.props.EVENT_WEBAPI_REQUEST_FETCH);
}

/**
 * @param {AppEventEmitter} eventDispatcher
 * @return {DeskproAPIClient}
 */
function createDeskproApiClient(eventDispatcher)
{
  "use strict";
  return new DeskproAPIClient(eventDispatcher);
}


export {
  /**
   * @function
   */
  createDeskproApiClient,

  /**
   * @function
   */
  registerEventHandlers,

  /**
   * @type {module:WebAPI/events}
   */
  WebAPIEvents
}
