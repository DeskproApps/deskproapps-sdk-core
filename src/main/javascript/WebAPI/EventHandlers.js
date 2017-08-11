/**
 * WebAPI/EventHandlers module.
 * @module WebAPI/EventHandlers
 */

import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

/**
 * @method
 * @param {App} app
 */
export const registerEventHandlers = (app) => {
  handleOutgoingEvent(app, Events.EVENT_WEBAPI_REQUEST_DESKPRO, Events.props.EVENT_WEBAPI_REQUEST_DESKPRO);
  handleOutgoingEvent(app, Events.EVENT_WEBAPI_REQUEST_FETCH, Events.props.EVENT_WEBAPI_REQUEST_FETCH);
};
