/**
 * UI module.
 * @module UI
 */

import * as UIEvents from './events';
export {
  /**
   * @type {module:UI/events}
   */
  UIEvents
}

import * as UIConstants from './constants';
export {
  /**
   * @type {module:UI/constants}
   */
  UIConstants
}

import UIFacade from './UIFacade';

/**
 * @method
 *
 * @param {AppEventEmitter} internalEventDispatcher
 * @return {UIFacade}
 */
export const create = (internalEventDispatcher) => { return new UIFacade(internalEventDispatcher); };