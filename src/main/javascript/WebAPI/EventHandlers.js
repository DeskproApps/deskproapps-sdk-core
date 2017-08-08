/**
 * WebAPI/EventHandlers module.
 * @module WebAPI/EventHandlers
 */

import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

/**
 * @method
 */
export const registerEventHandlers = () => {
  handleOutgoingEvent(Events.EVENT_WEBAPI_REQUEST_DESKPRO, Events.props.EVENT_WEBAPI_REQUEST_DESKPRO);
  handleOutgoingEvent(Events.EVENT_WEBAPI_REQUEST_FETCH, Events.props.EVENT_WEBAPI_REQUEST_FETCH);
};
