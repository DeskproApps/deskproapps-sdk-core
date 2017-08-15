/**
 * UI module.
 * @module UI
 */

import * as UIEvents from './Events';
export {
  /**
   * @type {module:UI/Events}
   */
  UIEvents
}

import * as UIConstants from './Constants';
export {
  /**
   * @type {module:UI/Constants}
   */
  UIConstants
}

import { UIFacade } from './UIFacade';

/**
 * @method
 *
 * @param {EventDispatcher} internalEventDispatcher
 * @return {UIFacade}
 */
export const create = (internalEventDispatcher) => { return new UIFacade(internalEventDispatcher); };