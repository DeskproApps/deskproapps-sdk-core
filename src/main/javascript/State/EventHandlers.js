import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

export const registerEventHandlers = () => {
  handleOutgoingEvent(Events.EVENT_STATE_DELETE, Events.props.EVENT_STATE_DELETE);
  handleOutgoingEvent(Events.EVENT_STATE_GET, Events.props.EVENT_STATE_GET);
  handleOutgoingEvent(Events.EVENT_STATE_SET, Events.props.EVENT_STATE_SET);
  handleOutgoingEvent(Events.EVENT_STATE_FIND, Events.props.EVENT_STATE_FIND);
};
