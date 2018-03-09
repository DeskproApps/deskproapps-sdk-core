
import * as ContextEvents from './ContextEvents';

/**
 * @class
 */
class Context
{
  /**
   * @param {AppEventEmitter} outgoingDispatcher
   * @param {AppEventEmitter} incomingDispatcher
   * @param {String} type
   * @param {String} entityId
   * @param {String} locationId
   * @param {...*} rest
   * @constructor
   */
  constructor({ outgoingDispatcher, incomingDispatcher, type, entityId, locationId, ...rest }) {
    this.props = { outgoingDispatcher, incomingDispatcher, type, entityId, locationId, ...rest }
  }

  /**
   * @public
   * @return {CustomFieldsClient}
   */
  get customFields() { throw new Error('The current context does not support custom fields'); }

  /**
   * @public
   * @return {String}
   */
  get type() { return this.props.type.toString(); }

  /**
   * @public
   * @return {String}
   */
  get entityId() { return this.props.entityId.toString(); }

  /**
   * @public
   * @return {String}
   */
  get locationId() { return this.props.locationId.toString(); }

  /**
   * @method
   *
   * @param {String} propName
   * @return {boolean}
   */
  hasProperty (propName) { return this.props.hasOwnProperty(propName) };

  /**
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
   * @public
   * @method
   * @async
   * @return {Promise}
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