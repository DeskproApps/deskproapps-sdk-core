/**
 * @module Core/AppEventHandlers
 */

import * as Events from './AppEvents';
import { handleOutgoingEvent } from './EventHandler';

/**
 * @method
 */
export const registerEventHandlers = () => {
  handleOutgoingEvent(Events.EVENT_RESET_SIZE, Events.props.EVENT_RESET_SIZE);
  handleOutgoingEvent(Events.EVENT_SUBSCRIBE, Events.props.EVENT_SUBSCRIBE);
};
