import * as Events from './Events';
import { handleOutgoingEvent } from '../Core/EventHandler';

export const registerEventHandlers = () => {
  handleOutgoingEvent(Events.EVENT_WEBAPI_REQUEST_DESKPRO, Events.props.EVENT_WEBAPI_REQUEST_DESKPRO);
};
