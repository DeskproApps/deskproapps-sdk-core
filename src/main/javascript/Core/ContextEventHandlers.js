/**
 * @module Core/ContextEventHandlers
 */

import * as Events from './ContextEvents';
import { handleOutgoingEvent } from './EventHandler';

/**
 * @method
 * @param {App} app
 */
export const registerEventHandlers = (app) => {
  handleOutgoingEvent(app, Events.EVENT_ME_GET, Events.props.EVENT_ME_GET);
  handleOutgoingEvent(app, Events.EVENT_TAB_DATA, Events.props.EVENT_TAB_DATA);
  handleOutgoingEvent(app, Events.EVENT_TAB_ACTIVATE, Events.props.EVENT_TAB_ACTIVATE);
  handleOutgoingEvent(app, Events.EVENT_TAB_CLOSE, Events.props.EVENT_TAB_CLOSE);
};