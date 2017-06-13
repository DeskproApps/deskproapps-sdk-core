import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

export const registerEventHandlers = () => {
  handleOutgoingEvent(Events.EVENT_DESKPROWINDOW_INSERT_MARKUP, Events.props.EVENT_DESKPROWINDOW_INSERT_MARKUP);
  handleOutgoingEvent(Events.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION, Events.props.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION);
};