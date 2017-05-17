import { Context } from '../Core/Context';
import Event from '../Core/Event';

import * as TicketEvents from './TicketEvents';

export class TicketContext extends Context
{
  static get TYPE() { return 'ticket'; }

  /**
   * @async
   * @param {String} id
   */
  fetchTicket = id => {
    //'/ticket/{id}'
  };

  /**
   * @async
   * @param {String} id
   */
  fetchPerson = id => {
    //'/people/{id}'
  };

  /**
   * @async
   */
  fetchOrg = () => {

  };

  /**
   * @async
   */
  fetchAgent = () => {

  };

  /**
   * @async
   */
  fetchCcdPeople = () => {

  };

  /**
   * @async
   */
  fetchCcdPeople = () => {

  };

  /**
   * @async
   */
  fetchMessages = () => {

  };

  /**
   * @async
   * @param {String} id
   */
  fetchMessageById = id => {

  };

  /**
   * @async
   * @param {String} message
   */
  addTicketLogMessage = message => {
    const event = new Event({ name: TicketEvents.EVENT_BEFORE_MESSAGE_ADDED });
  };
}

export const tryAndCreate = props => props.type === TicketContext.TYPE ? new TicketContext(props) : null;