import * as ContextUserEvents from './ContextUserEvents';

/**
 * Representation of an application's runtime context
 *
 * @class
 */
class Context
{
  /**
   * @param {AppEventEmitter} outgoingDispatcher the outgoing events dispatcher
   * @param {ContextHostUI} hostUI the interface for context supplied by the Deskpro ui component hosting the app
   * @param {ContextObject} object the interface for the context supplied by the Deskpro Object
   * @param {...*} rest
   * @constructor
   */
  constructor({ outgoingDispatcher, hostUI, object, ...rest }) {
    this.props = { outgoingDispatcher, hostUI, object, ...rest }
  }

  /**
   * The interface for the Deskpro UI component hosting the app
   *
   * @type {ContextHostUI}
   */
  get hostUI() { return this.props.hostUI; }

  /**
   * The interface for the Deskpro Object exposed by this context
   *
   * @type {ContextObject}
   */
  get object() { return this.props.object; }

  /**
   * Alias for `Context.object.customFields`. Allows accessing the context object's custom fields.
   * This property is null when the object does not support custom fields
   *
   * @type {CustomFieldsClient|null}
   */
  get customFields() { return this.object.customFields; }

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
    return this.props.outgoingDispatcher.emitAsync(ContextUserEvents.EVENT_ME_GET);
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