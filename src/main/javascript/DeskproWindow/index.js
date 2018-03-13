/**
 * This module exports the interface of the DeskproWindow package
 *
 * @module DeskproWindow
 */

import * as DeskproWindowEvents from './events';
import DeskproWindowFacade from './DeskproWindowFacade'

/**
 * @function
 * @param {AppEventEmitter} eventDispatcher
 * @returns {DeskproWindowFacade}
 */
function createDeskproWindowFacade(eventDispatcher) {
  "use strict";
  return new DeskproWindowFacade(eventDispatcher);
}

export {
  /**
   * @type {module:DeskproWindow/events}
   */
  DeskproWindowEvents
};

export {
  /**
   * @method
   */
  registerEventHandlers
} from './events';

export {
  createDeskproWindowFacade,

  /**
   * @type {DeskproWindowFacade}
   */
  DeskproWindowFacade
} from './DeskproWindowFacade';