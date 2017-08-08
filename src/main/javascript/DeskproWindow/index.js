/**
 * @module DeskproWindow
 */

import * as DeskproWindowEvents from './Events';
export {
  /**
   * @type {module:DeskproWindow/Events}
   */
  DeskproWindowEvents
};

export {
  /**
   * @method
   */
  registerEventHandlers
} from './EventHandlers';

export {
  /**
   * @method
   */
  create as createDeskproWindowFacade,

  /**
   * @type {DeskproWindowFacade}
   */
  DeskproWindowFacade
} from './DeskproWindowFacade';