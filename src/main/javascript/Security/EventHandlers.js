/**
 * Security/EventHandlers module.
 * @module Security/EventHandlers
 */

import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

/**
 * @method
 */
export const registerEventHandlers = () => {
  handleOutgoingEvent(Events.EVENT_SECURITY_AUTHENTICATE_OAUTH, Events.props.EVENT_SECURITY_AUTHENTICATE_OAUTH);
  handleOutgoingEvent(Events.EVENT_SECURITY_SETTINGS_OAUTH, Events.props.EVENT_SECURITY_SETTINGS_OAUTH);
};
