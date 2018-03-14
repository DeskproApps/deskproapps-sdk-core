import * as ContextEvents from './ContextEvents';

/**
 * Representation of an application's runtime context. This class is meant to be extended to create concrete context implementations
 *
 * @class
 */
class Context
{
  /**
   * @param {AppEventEmitter} outgoingDispatcher the outgoing events dispatcher
   * @param {AppEventEmitter} incomingDispatcher the incoming events dispatcher
   * @param {String} type the context type
   * @param {String} entityId the id of the Deskpro Entity referenced by this context
   * @param {String} locationId the id of the specific location within the UITab where the app is mounted
   * @param {...*} rest
   * @constructor
   */
  constructor({ outgoingDispatcher, incomingDispatcher, type, entityId, locationId, ...rest }) {
    this.props = { outgoingDispatcher, incomingDispatcher, type, entityId, locationId, ...rest }
  }

  /**
   * A client for the `CustomFields` API of this context
   *
   * @public
   * @return {CustomFieldsClient}
   */
  get customFields() { throw new Error('The current context does not support custom fields'); }

  /**
   * The type of this context
   *
   * @public
   * @return {String}
   */
  get type() { return this.props.type.toString(); }

  /**
   * The id of the Deskpro Entity which belongs to this context.
   *
   * For example if the `type` is `ticket`, then this is the id of `Ticket` Entity
   *
   * @public
   * @return {String}
   */
  get entityId() { return this.props.entityId.toString(); }

  /**
   * The id of the location within the helpdesk UI where this application is shown
   *
   * @public
   * @return {String}
   */
  get locationId() { return this.props.locationId.toString(); }

  /**
   * Checks if a property exists in this context
   *
   * @method
   *
   * @param {String} propName
   * @return {boolean}
   */
  hasProperty (propName) { return this.props.hasOwnProperty(propName) };

  /**
   * Retrieves a property from this context
   *
   * @method
   *
   * @param {String} propName
   * @return {*}
   */
  getProperty(propName) {
    if (this.props.hasOwnProperty(propName)) {
      return this.props[propName];
    }

    return undefined;
  };

  /**
   * Returns a representation of the currently authenticated user
   *
   * @public
   * @method
   * @async
   * @return {Promise.<Context~Me, Error>}
   */
  async getMe() {
    return this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_ME_GET);
  }

  /**
   * @method
   *
   * @return {Object}
   */
  toJS() { return {...this.props}; }
}

export default Context;

/**
 * Representation of the currently signed-in user
 *
 * @typedef {Object} Context~Me
 * @property {number} id
 * @property {object} avatar,
 * @property {boolean} can_admin,
 * @property {boolean} can_agent,
 * @property {boolean} can_billing,
 * @property {boolean} is_agent,
 * @property {boolean} is_confirmed,
 * @property {boolean} is_contact,
 * @property {boolean} is_deleted,
 * @property {boolean} is_disabled,
 * @property {boolean} is_user,
 * @property {boolean} was_agent,
 * @property {boolean} online,
 * @property {Array<String>} labels,
 * @property {Array<String>} teams,
 * @property {Array<object>} phone_numbers,
 * @property {String} date_created,
 * @property {String} date_last_login,
 * @property {String} name,
 * @property {String} display_name,
 * @property {String} first_name,
 * @property {String} last_name,
 * @property {Object} primary_email,
 * @property {Array.<String>} emails,
 * @property {String} gravatar_url,
 * @property {number} tickets_count,
 * @property {String} timezone
 */