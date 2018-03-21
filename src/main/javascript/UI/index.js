/**
 * This module exports the interface of the UI package
 * @module UI
 */

import * as UIEvents from './events';
import * as UIConstants from './constants';
import UIFacade from './UIFacade';

export {
  /**
   * @type {module:UI/events}
   */
  UIEvents,

  /**
   * @type {module:UI/constants}
   */
  UIConstants
}

/**
 * @method
 *
 * @param {EventDispatcher} outgoingDispatcher
 * @param {AppEventEmitter} internalEventDispatcher
 * @return {UIFacade}
 */
export const create = (outgoingDispatcher, internalEventDispatcher) => {
  return new UIFacade(outgoingDispatcher, internalEventDispatcher);
};
