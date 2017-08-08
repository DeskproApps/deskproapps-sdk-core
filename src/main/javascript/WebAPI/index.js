/**
 * UI module.
 * @module WebAPI
 */

import * as WebAPIEvents from './Events';
export {
  /**
   * @type {module:WebAPI/Events}
   */
  WebAPIEvents
}

export {
  /**
   * @method
   */
  create as createDeskproApiClient
} from './DeskproAPIClient';


export {
  /**
   * @method
   */
  registerEventHandlers
} from './EventHandlers';