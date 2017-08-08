/**
 * @module Core/ContextEventHandlers
 */

import * as Events from './ContextEvents';
import { handleOutgoingEvent } from './EventHandler';

/**
 * @method
 *
 */
export const registerEventHandlers = () => {
  handleOutgoingEvent(Events.EVENT_ME_GET, Events.props.EVENT_ME_GET);
  handleOutgoingEvent(Events.EVENT_TAB_DATA, Events.props.EVENT_TAB_DATA);
  handleOutgoingEvent(Events.EVENT_TAB_ACTIVATE, Events.props.EVENT_TAB_ACTIVATE);
  handleOutgoingEvent(Events.EVENT_TAB_CLOSE, Events.props.EVENT_TAB_CLOSE);
};