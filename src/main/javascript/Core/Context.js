import * as ContextUserEvents from './ContextUserEvents';
import * as UITabEvents from "../Context/eventsTab";

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
   * Check if an object of this type is available via `Context.get` in this context
   *
   * @param {String} objectType
   * @return {boolean}
   */
  available(objectType)
  {
    return objectType === this.props.object.type
  }

  /**
   * Returns one of the Deskpro Objects exposed by this context
   *
   * @param {String} objectType
   * @return {ContextObject}
   */
  get(objectType) {
    if (! this.available(objectType)) {
      throw new Error(`Object of type ${type} is not available`);
    }

    return this.props.object;
  }

  /**
   * Returns the data loaded by the Deskpro UI tab
   *
   * @private
   *
   * @method
   * @async
   * @return {Promise.<{}, Error>}
   */
  async _getTabData() { return this.props.outgoingDispatcher.emitAsync(UITabEvents.EVENT_TAB_DATA, this.props.tabId); }

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