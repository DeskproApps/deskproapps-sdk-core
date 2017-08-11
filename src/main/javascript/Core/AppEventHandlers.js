/**
 * @module Core/AppEventHandlers
 */

import * as Events from './AppEvents';
import { handleOutgoingEvent } from './EventHandler';

/**
 * @method
 * @param {App} app
 */
export const registerEventHandlers = (app) => {
  handleOutgoingEvent(app, Events.EVENT_RESET_SIZE, Events.props.EVENT_RESET_SIZE);
  handleOutgoingEvent(app, Events.EVENT_SUBSCRIBE, Events.props.EVENT_SUBSCRIBE);
};
