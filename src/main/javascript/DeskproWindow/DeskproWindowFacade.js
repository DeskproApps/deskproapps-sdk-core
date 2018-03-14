import * as Events from './events';

/**
 * @class
 */
class DeskproWindowFacade
{
  constructor(eventDispatcher) {
    this.props = { eventDispatcher };
  }

  /**
   * @method
   *
   * @param notification
   * @return Promise<null,null>
   */
  async showNotification (notification) {
    return this.props.eventDispatcher.emitAsync(Events.EVENT_DESKPROWINDOW_SHOW_NOTIFICATION, notification);
  }

  /**
   * Inserts markup into a specific parent or document.body
   *
   * @method
   * 
   * @param {DOMInsertRequest} insertRequest the markup to insert
   * @return {Promise<String,Error>}
   */
  async domInsert(insertRequest) {
    return this.props.eventDispatcher.emitAsync(Events.EVENT_DESKPROWINDOW_DOM_INSERT, insertRequest);
  }

  /**
   * @method
   *
   * @param {DOMQueryPattern|Array.<DOMQueryPattern>} query a
   * @return {Promise<Array<DOMQueryMatchExists|DOMQueryMatchValueOf>, Error>}
   */
  async domQuery(query) {
    return this.props.eventDispatcher.emitAsync(Events.EVENT_DESKPROWINDOW_DOM_QUERY, query);
  }
}

export default DeskproWindowFacade

/**
 * Representation of a DOM Insert Request
 *
 * @typedef {Object} DOMInsertRequest
 * @property {string} [parent] a parent DOM selector. Jquery selectors supported. If omitted, document.body is assumed
 * @property {string} markup the markup to insert
 */

/**
 * Representation of a DOM Query Pattern
 *
 * @typedef {Object} DOMQueryPattern
 * @property {'valueOf'|'exists'} type the type of selection, controls what will be returned in case of a match
 * @property {string} selector a selector string, see {@link  https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors}. jquery selectors also accepted
 */

/**
 * Represents the result of applying a DOM Query Pattern with a `valueOf` type
 *
 * @typedef {Object} DOMQueryMatchValueOf
 * @property {'valueOf'} type type the type of selection
 * @property {string} selector the original selector
 * @property {string} value the matched nodes
 */

/**
 * Represents the result of applying a DOM Query Pattern with a `exists` type
 *
 * @typedef {Object} DOMQueryMatchExists
 * @property {'exists'} type
 * @property {string} selector the original selector
 * @property {boolean} exists true if any dom nodes matched the original selector
 */