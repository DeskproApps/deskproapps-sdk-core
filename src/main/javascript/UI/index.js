/**
 * UI module.
 * @module UI
 */

import * as UIEvents from './Events';
export { UIEvents }

import * as UIConstants from './Constants';
export { UIConstants }

import { UIFacade } from './UIFacade';
import { createResizer } from './Resizer';

/**
 * @param {EventDispatcher} internalEventDispatcher
 * @param {EventDispatcher} outgoingEventDispatcher
 * @param {WindowProxy} windowProxy
 * @return {UIFacade}
 */
export const create = (internalEventDispatcher, outgoingEventDispatcher, windowProxy) => {
  "use strict";
  const resizer = createResizer(outgoingEventDispatcher, windowProxy);
  return new UIFacade(internalEventDispatcher, resizer);
};