import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

export const registerEventHandlers = () => {
  handleOutgoingEvent(Events.EVENT_SECURITY_AUTHENTICATE_OAUTH, Events.props.EVENT_SECURITY_AUTHENTICATE_OAUTH);
};
