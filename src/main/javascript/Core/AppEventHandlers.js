import * as Events from './AppEvents';
import { handleOutgoingEvent } from './EventHandler';

export const registerEventHandlers = () => {
  handleOutgoingEvent(Events.EVENT_RESET_SIZE, Events.props.EVENT_RESET_SIZE);
  handleOutgoingEvent(Events.EVENT_SHOW_NOTIFICATION, Events.props.EVENT_SHOW_NOTIFICATION);
  handleOutgoingEvent(Events.EVENT_SUBSCRIBE, Events.props.EVENT_SUBSCRIBE);
};
