/**
 * Security/EventHandlers module.
 * @module Security/EventHandlers
 */

import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

/**
 * @method
 * @param {App} app
 */
export const registerEventHandlers = (app) => {
  handleOutgoingEvent(app, Events.EVENT_SECURITY_AUTHENTICATE_OAUTH, Events.props.EVENT_SECURITY_AUTHENTICATE_OAUTH);
  handleOutgoingEvent(app, Events.EVENT_SECURITY_SETTINGS_OAUTH, Events.props.EVENT_SECURITY_SETTINGS_OAUTH);
};
